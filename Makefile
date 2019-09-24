clean:
	-rm -rf ./p3_7env
	-rm *pyc
	-rm -rf __pycache__
build:
	pip install virtualenv; \
	virtualenv -p python3.7 p3_7env --no-site-packages
	. ./p3_7env/bin/activate; \
	pip wheel -r requirements.txt --wheel-dir=wheels

init:
	pip install virtualenv; \
	virtualenv -p python3.7 p3_7env --no-site-packages; \
	. ./p3_7env/bin/activate; \
	pip install -r requirements.txt

test:
	. ./p3_7env/bin/activate; \
	export ENV test; \
	coverage run --source flask_app -m unittest discover -vcs tests

dev:
	. ./p3_7env/bin/activate; \
	export ENV dev; \
	export FLASK_APP=flask_app; \
	export FLASK_ENV=development; \
	flask run

.PHONY: clean build init test dev
