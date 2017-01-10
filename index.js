const colors = require('colors');

const consoleMethods = ['error', 'warn', 'info', 'log'];

consoleMethods.forEach(methodName => {
	console[`_${methodName}`] = console[methodName];
	console[methodName] = function () {
		try {
			throw new Error('');
		} catch (e) {
			this[`_${methodName}`](...arguments);

			e.stack = e.stack.split('\n').splice(2, 1).join('\n');
			e.stack = e.stack.trimLeft().replace(/^at /, `find in `);

			let status = `[${methodName}]          `;
			status = status.split('').splice(0, 7).join('');

			this._log(status.cyan, e.stack.grey);
		}
	};
});
