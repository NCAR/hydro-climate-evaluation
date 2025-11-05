all: dev

# install nodejs dependencies and run
init: cleanall install
install:
	npm install .
build:
	npm run build
run:
	npm run start
dev:
	npm run dev
local:
	npm run local

clean:
	rm -f *~

cleanall: clean
	rm -rf node_modules .next
