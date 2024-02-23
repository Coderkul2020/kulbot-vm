const ArgumentType = require('../../extension-support/argument-type'); 
const BlockType = require('../../extension-support/block-type'); 
const Cast = require('../../util/cast'); 

const log = require('../../util/log');
class Scratch3myExtension {
	constructor(runtime) {
		this.runtime = runtime;
	}

	getInfo() {
		return {
			id: 'myExtension',
			name: 'My Extension', 
			blocks: [
				{
					opcode: 'writeText',
					blockType: BlockType.COMMAND,
					text: 'myText [TEXT]',
					arguments: {
						TEXT: {
							type: ArgumentType.STRING,
							defaultValue: "hello"
						}
					}
				}
				


			],
			menus: {
			}

		}
		
	}

	writeText(args) {
		const text = Cast.toString(args.TEXT);
		log.myText(text);
	}
};

module.exports = Scratch3myExtension;