import { useEffect, useState } from 'react';
import { Box, Heading } from 'theme-ui';
import Meta from '../components/meta';
import { settings } from '../initialConditions/global-test';

const DATA_ROOT = `${settings.bucket}map/`;
const HISTORICAL_DIRECTORY = 'hist.1850_2005';

const GROUPS = [
  {
    id: 'cmip5',
    title: 'CMIP5: historical 1850–2005',
    historicalLabel: '1850–2005',
    scenarios: ['rcp45', 'rcp85'],
  },
  {
    id: 'cmip6',
    title: 'CMIP6: historical 1850–2014',
    historicalLabel: '1850–2014',
    scenarios: ['ssp245', 'ssp370', 'ssp585'],
  },
];

const metadataUrl = (cmip, model, period, ensemble) =>
  `${DATA_ROOT}${cmip}/${model}/${period}/${ensemble}/data.zarr/.zmetadata`;

const exists = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

// Avoid issuing hundreds of requests at once for models with many ensembles.
const mapWithConcurrency = async (items, concurrency, callback) => {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await callback(items[index]);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, worker)
  );
  return results;
};

const statusStyle = (missing) => ({
  color: missing ? '#b42318' : '#067647',
  fontWeight: 600,
});

const MissingTable = ({ group, rows, loading }) => (
  <Box sx={{ mb: 5, overflowX: 'auto' }}>
    <Heading as="h2" sx={{ mb: 3, fontSize: 3 }}>
      {group.title}
    </Heading>

    <Box as="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {['Model', 'Ensemble', group.historicalLabel, ...group.scenarios].map(
            (heading) => (
              <Box
                as="th"
                key={heading}
                sx={{ textAlign: 'left', borderBottom: '2px solid', p: 2 }}
              >
                {heading}
              </Box>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={`${row.model}-${row.ensemble}`}>
            <Box as="td" sx={{ borderBottom: '1px solid', p: 2 }}>
              {row.model}
            </Box>
            <Box as="td" sx={{ borderBottom: '1px solid', p: 2 }}>
              {row.ensemble}
            </Box>
            <Box as="td" sx={{ borderBottom: '1px solid', p: 2 }}>
              <Box as="span" sx={statusStyle(false)}>exists</Box>
            </Box>
            {group.scenarios.map((scenario) => {
              const missing = !row.scenarios[scenario];
              return (
                <Box
                  as="td"
                  key={scenario}
                  sx={{ borderBottom: '1px solid', p: 2 }}
                >
                  <Box as="span" sx={statusStyle(missing)}>
                    {missing ? 'missing' : 'exists'}
                  </Box>
                </Box>
              );
            })}
          </tr>
        ))}
        {!loading && rows.length === 0 && (
          <tr>
            <Box as="td" colSpan={3 + group.scenarios.length} sx={{ p: 2 }}>
              No missing scenarios found.
            </Box>
          </tr>
        )}
      </tbody>
    </Box>

    {loading && <Box sx={{ mt: 2 }}>Checking datasets…</Box>}
  </Box>
);

const GlobalMissing = () => {
  const [rows, setRows] = useState({ cmip5: [], cmip6: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const reports = await Promise.all(
        GROUPS.map(async (group) => {
          const candidates = Object.entries(settings.ensemble[group.id]).flatMap(
            ([model, ensembles]) =>
              ensembles.map((ensemble) => ({ model, ensemble }))
          );

          const checked = await mapWithConcurrency(
            candidates,
            12,
            async ({ model, ensemble }) => {
              const historical = await exists(
                metadataUrl(
                  group.id,
                  model,
                  HISTORICAL_DIRECTORY,
                  ensemble
                )
              );

              if (!historical) return null;

              const scenarioResults = await Promise.all(
                group.scenarios.map(async (scenario) => [
                  scenario,
                  await exists(
                    metadataUrl(
                      group.id,
                      model,
                      `hist.${scenario}`,
                      ensemble
                    )
                  ),
                ])
              );
              const scenarios = Object.fromEntries(scenarioResults);

              return Object.values(scenarios).every(Boolean)
                ? null
                : { model, ensemble, scenarios };
            }
          );

          return [group.id, checked.filter(Boolean)];
        })
      );

      if (!cancelled) {
        setRows(Object.fromEntries(reports));
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Meta
        title="Missing global climate scenarios"
        description="Global CMIP historical ensembles with missing scenario data"
      />
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 4, py: 4 }}>
        <Heading as="h1" sx={{ mb: 2 }}>
          Missing global climate scenarios
        </Heading>
        <Box sx={{ mb: 4 }}>
          Only historical model/ensemble datasets with at least one missing
          scenario are shown.
        </Box>

        {GROUPS.map((group) => (
          <MissingTable
            key={group.id}
            group={group}
            rows={rows[group.id]}
            loading={loading}
          />
        ))}
      </Box>
    </>
  );
};

export default GlobalMissing;
