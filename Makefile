REPORTER = spec

BASE = .

JSHINT = ./node_modules/.bin/jshint

main: lint test

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER)

lint:
	$(JSHINT) ./lib --config $(BASE)/.jshintrc

.PHONY: test docs
