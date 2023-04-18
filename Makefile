
.PHONY: test-prod test-local

test-prod:
	@docker-compose up --abort-on-container-exit --build test-prod

test-local:
	@docker-compose up --abort-on-container-exit --exit-code-from test-local --build test-local
