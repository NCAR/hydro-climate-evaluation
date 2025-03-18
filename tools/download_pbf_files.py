import os
import requests
import sys
import xml.etree.ElementTree as ET

def generate_keys(prefix):
    url_base='https://carbonplan-maps.s3.us-west-2.amazonaws.com/'
    for i in range(6):
         for j in range(33):
             for k in range(34):
                 pbf_file = prefix+ str(i) + '/' + str(j) + '/' + str(k) + '.pbf'
                 url = url_base + pbf_file

                 if (i>6):
                     sys.exit()
                 if (i == 2 and j > 3):
                     continue
                 if (i == 0 and k > 0):
                     continue
                 if (i == 1 and k > 1):
                     continue
                 if (i == 2 and k > 3):
                     continue
                 if (i == 3 and j > 7):
                     continue
                 if (i == 4 and k > 15):
                     continue

                 if (os.path.exists(pbf_file)):
                     print(f"Have {pbf_file}")
                     continue

                 os.makedirs(os.path.dirname(pbf_file), exist_ok=True)
                 response = requests.get(url, stream=True)

                 if response.status_code == 200:
                     with open(pbf_file, "wb") as file:
                         for chunk in response.iter_content(chunk_size=8192):
                             file.write(chunk)
                             print(f"Downloaded: {pbf_file}")

                 else:
                     print(f"Failed to download: {url} (Status {response.status_code})")


# Run the function
print('start')
generate_keys("basemaps/land/")
generate_keys("basemaps/ocean/")
print('fin')
