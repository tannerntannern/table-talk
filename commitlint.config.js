module.exports = {
	extends: ['@commitlint/config-conventional'],
	"rules": {
		"header-max-length": [0, "always", 100],
		"subject-empty": [0, "never"]
	}
};
