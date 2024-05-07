# local port number
port=3000

all: rundocker

rundocker: cleandocker builddocker
	docker run --entrypoint "/bin/sh" -it -p ${port}:${port} --name runicarmaps icarmaps

# install nodejs dependencies and run
run:
	npm run dev
init:
	rm -rf node_modules
	npm install .

build:
	npm install .

# build and clean docker images
builddocker:
	docker build -t icarmaps .

cleandocker:
	-docker rm runicarmaps
cleandockerall: cleandocker
	docker builder prune

clean:
	rm -f *~

cleanall: clean
	rm -rf node_modules .next

# runcached:
# 	docker run -it -p ${port}:${port} --name runicarmaps icarmaps
# 	docker run -t -d -p ${port}:${port} --name runicarmaps icarmaps
# 	docker run -t -d --name runicarmaps icarmaps
