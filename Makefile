all: run

build:
	npm install .

run:
	rm -rf .next/cache/
	npm run dev


clean:
	rm -f *~

cleanall: clean
	rm -rf node_modules .next
