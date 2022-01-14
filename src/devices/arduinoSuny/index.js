const formatMessage = require('format-message');

const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const ProgramModeType = require('../../extension-support/program-mode-type');

const ArduinoPeripheral = require('../arduinoCommen/arduino-peripheral');

/**
 * The list of USB device filters.
 * @readonly
 */
 const PNPID_LIST = [
    // CH340
    'USB\\VID_1A86&PID_7523',
    // CH9102
    'USB\\VID_1A86&PID_55D4',
    // CP2102
    'USB\\VID_10C4&PID_EA60'
];
/**
 * Configuration of serialport
 * @readonly
 */
const SERIAL_CONFIG = {
    baudRate: 115200,
    dataBits: 8,
    stopBits: 1
};

/**
 * Configuration for arduino-cli.
 * @readonly
 */
 const DIVECE_OPT = {
    type: 'arduino',
    fqbn: 'esp32:esp32:esp32:UploadSpeed=115200'
};

const Pins = {
    Port1: '1',
    Port2: '2',
    Port3: '3',
    Port4: '4',
    Port5: '5',
    Port6: '6',
    Port7: '7',
    Port8: '8'
};

const Color_X = {
    None: '0',
    Red: '1',
    Blue: '2',
    Green: '3',
    Yellow: '4',
    Violet: '5',
    White: '6',
    Cyb: '7',
};


const Level = {
    High: 'HIGH',
    Low: 'LOW'
};

const Level_statue = {
    ON: "ON",
    NONE: "NONE"
};

const Level_color = {
    R: "R",
    G: "G",
    Y: "Y"
};

const Level_IRcolor = {
    Right: "1",
    Left: "2",
    All: "3"
};

// Choice to dimesion 
const MFB = {
    MF: '0',
    MB: '1'
};

// Choice to DHT11 
const Dht11_mode = {
    Temp: '0',
    Hum: '1'
};

// Choice to line color 
const Coline = {
    CW: '1',
    CB: '2'
};

// Choice Motor1, Moter 2
const Moption = {
    M1: '1',
    M2: '2'
};
const Buadrate = {
    B4800: '4800',
    B9600: '9600',
    B19200: '19200',
    B38400: '38400',
    B57600: '57600',
    B115200: '115200'
};

const Eol = {
    Warp: 'warp',
    NoWarp: 'noWarp'
};

const Mode = {
    Input: 'INPUT',
    Output: 'OUTPUT',
    InputPullup: 'INPUT_PULLUP'
};

const InterrupMode = {
    Rising: 'RISING',
    Falling: 'FALLING',
    Change: 'CHANGE',
    Low: 'LOW'
};

const DataType = {
    WholeNumber: 'WHOLE_NUMBER',
    Decimal: 'DECIMAL',
    String: 'STRING'
};

/**
 * Manage communication with a Arduino Uno peripheral over a OpenBlock Link client socket.
 */
class Arduinokulbot extends ArduinoPeripheral{
    /**
     * Construct a Arduino communication object.
     * @param {Runtime} runtime - the OpenBlock runtime
     * @param {string} deviceId - the id of the extension
     * @param {string} originalDeviceId - the original id of the peripheral, like xxx_arduinoUno
     */
    constructor (runtime, deviceId, originalDeviceId) {
        super(runtime, deviceId, originalDeviceId, PNPID_LIST, SERIAL_CONFIG, DIVECE_OPT);
    }
}

/**
 * OpenBlock blocks to interact with a Arduino Uno peripheral.
 */
class OpenBlockArduinokulbotDevice {
    /**
     * @return {string} - the ID of this extension.
     */
    static get DEVICE_ID () {
        return 'arduinokulbot';
    }

    get PINS_MENU () {
        return [
            {
                text: '1',
                value: Pins.Port1
            },
            {
                text: '2',
                value: Pins.port2
            },
            {
                text: '3',
                value: Pins.Port3
            },
            {
                text: '4',
                value: Pins.Port4
            },
            {
                text: '5',
                value: Pins.Port5
            },
            {
                text: '6',
                value: Pins.Port6
            },
            {
                text: '7',
                value: Pins.Port7
            },
            {
                text: '8',
                value: Pins.Port8
            }
        ];
    }

    get MODE_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'arduinokulbot.modeMenu.input',
                    default: 'input',
                    description: 'label for input pin mode'
                }),
                value: Mode.Input
            },
            {
                text: formatMessage({
                    id: 'arduinokulbot.modeMenu.output',
                    default: 'output',
                    description: 'label for output pin mode'
                }),
                value: Mode.Output
            },
            {
                text: formatMessage({
                    id: 'arduinokulbot.modeMenu.inputPullup',
                    default: 'input-pullup',
                    description: 'label for input-pullup pin mode'
                }),
                value: Mode.InputPullup
            }
        ];
    }
    
    get DIGITAL_PINS_MENU () {
        return [
            {
                text: '1',
                value: Pins.Port1
            },
            {
                text: '2',
                value: Pins.Port2
            },
            {
                text: '3',
                value: Pins.Port3
            },
            {
                text: '4',
                value: Pins.Port4
            },
            {
                text: '5',
                value: Pins.Port5
            },
            {
                text: '6',
                value: Pins.Port6
            },
            {
                text: '7',
                value: Pins.Port7
            },
            {
                text: '8',
                value: Pins.Port8
            }
        ];
    }

    get CoLor_X () {
        return [
            {
                text: 'None',
                value: Color_X.None
            },
            {
                text: 'Red',
                value: Color_X.Red
            },
            {
                text: 'Blue',
                value: Color_X.Blue
            },
            {
                text: 'Green',
                value: Color_X.Green
            },
            {
                text: 'Yellow',
                value: Color_X.Yellow
            },
            {
                text: 'Violet',
                value: Color_X.Violet
            },
            {
                text: 'White',
                value: Color_X.White
            },
            {
                text: 'Cyber',
                value: Color_X.Cyb
            }
        ];
    }


    

    get LEVEL_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'arduinokulbot.levelMenu.high',
                    default: 'High',
                    description: 'label for high level'
                }),
                value: Level.High
            },
            {
                text: formatMessage({
                    id: 'arduinokulbot.levelMenu.low',
                    default: 'Low',
                    description: 'label for low level'
                }),
                value: Level.Low
            }
        ];
    }

    get LEVEL_DHT11 () {
        return [
            {
                text: formatMessage({
                    id: 'arduinokulbot.levelMenu.Temp',
                    default: 'Temperature (°C)',
                    description: 'label for Temp level'
                }),
                value: Dht11_mode.Temp
            },
            {
                text: formatMessage({
                    id: 'arduinokulbot.levelMenu.Hum',
                    default: 'Humany (%)',
                    description: 'label for Hum level'
                }),
                value: Dht11_mode.Hum
            }
        ];
    }

    get LEVEL_COLOR () {
        return [
            {
                text: formatMessage({
                    id: 'arduinokulbot.levelMenu.R',
                    default: "R",
                    description: 'label for red level'
                }),
                value: Level_color.R
            },
            {
                text: formatMessage({
                    id: 'arduinokulbot.levelMenu.G',
                    default: "G",
                    description: 'label for green level'
                }),
                value: Level_color.G
            },
            {
                text: formatMessage({
                    id: 'arduinokulbot.levelMenu.B',
                    default: "Y",
                    description: 'label for blue level'
                }),
                value: Level_color.Y
            }
        ];
    }



    get LEVEL_IRCOLOR () {
        return [
            {
                text: formatMessage({
                    id: 'arduinokulbot.levelMenu.Right',
                    default: "Right",
                    description: 'label for Right level'
                }),
                value: Level_IRcolor.Right
            },
            {
                text: formatMessage({
                    id: 'arduinokulbot.levelMenu.Left',
                    default: "Left",
                    description: 'label for Left level'
                }),
                value: Level_IRcolor.Left
            },
            {
                text: formatMessage({
                    id: 'arduinokulbot.levelMenu.All',
                    default: "All",
                    description: 'label for All level'
                }),
                value: Level_IRcolor.All
            }
        ];
    }

    get LEVEL_Moption () {
        return [
            {
                text: formatMessage({
                    id: 'arduinokulbot.levelMenu.m1',
                    default: 'M1',
                    description: 'label for high level'
                }),
                value: Moption.M1
            },
            {
                text: formatMessage({
                    id: 'arduinokulbot.levelMenu.m2',
                    default: 'M2',
                    description: 'label for low level'
                }),
                value: Moption.M2
            }
        ];
    }
    
    get LEVEL_STATUE () {
        return [
            {
                text: formatMessage({
                    id: 'arduinokulbot.levelMenu.ON',
                    default: "On",
                    description: 'On of the level'
                }),
                value: Level_statue.ON
            },
            {
                text: formatMessage({
                    id: 'arduinokulbot.levelMenu.NONE',
                    default: "Off",
                    description: 'None of level'
                }),
                value: Level_statue.NONE
            }
        ];
    }

    get LEVEL_MFB () {
        return [
            {
                text: formatMessage({
                    id: 'arduinokulbot.levelMenu.MF',
                    default: 'Front',
                    description: 'move Front of level'
                }),
                value: MFB.MF
            },
            {
                text: formatMessage({
                    id: 'arduinokulbot.levelMenu.MB',
                    default: 'Back',
                    description: 'move Back of level'
                }),
                value: MFB.MB
            }
        ];
    }

    get LEVEL_Linecolor () {
        return [
            {
                text: formatMessage({
                    id: 'arduinokulbot.levelMenu.CW',
                    default: 'Right',
                    description: 'move white color of level'
                }),
                value: Coline.CW
            },
            {
                text: formatMessage({
                    id: 'arduinokulbot.levelMenu.CB',
                    default: 'Left',
                    description: 'move black color of level'
                }),
                value: Coline.CB
            }
        ];
    }

    get BAUDTATE_MENU () {
        return [
            {
                text: '4800',
                value: Buadrate.B4800
            },
            {
                text: '9600',
                value: Buadrate.B9600
            },
            {
                text: '19200',
                value: Buadrate.B19200
            },
            {
                text: '38400',
                value: Buadrate.B38400
            },
            {
                text: '57600',
                value: Buadrate.B57600
            },
            {
                text: '115200',
                value: Buadrate.B115200
            }
        ];
    }

    get EOL_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'arduinokulbot.eolMenu.warp',
                    default: 'warp',
                    description: 'label for warp print'
                }),
                value: Eol.Warp
            },
            {
                text: formatMessage({
                    id: 'arduinokulbot.eolMenu.noWarp',
                    default: 'no-warp',
                    description: 'label for no warp print'
                }),
                value: Eol.NoWarp
            }
        ];
    }

    get DATA_TYPE_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'arduinokulbot.dataTypeMenu.wholeNumber',
                    default: 'whole number',
                    description: 'label for whole number'
                }),
                value: DataType.WholeNumber
            },
            {
                text: formatMessage({
                    id: 'arduinokulbot.dataTypeMenu.decimal',
                    default: 'decimal',
                    description: 'label for decimal number'
                }),
                value: DataType.Decimal
            },
            {
                text: formatMessage({
                    id: 'arduinokulbot.dataTypeMenu.string',
                    default: 'string',
                    description: 'label for string'
                }),
                value: DataType.String
            }
        ];
    }

    /**
     * Construct a set of Arduino blocks.
     * @param {Runtime} runtime - the OpenBlock runtime.
     * @param {string} originalDeviceId - the original id of the peripheral, like xxx_arduinoUno
     */
    constructor (runtime, originalDeviceId) {
        /**
         * The OpenBlock runtime.
         * @type {Runtime}
         */
        this.runtime = runtime;

        // Create a new Arduino uno peripheral instance
        this._peripheral = new Arduinokulbot(this.runtime, OpenBlockArduinokulbotDevice.DEVICE_ID, originalDeviceId);
    }

    /**
     * @returns {Array.<object>} metadata for this extension and its blocks.
     */
    getInfo () {
        return [
            {
                id: 'pin',
                name: formatMessage({
                    id: 'arduinokulbot.category.pins',
                    default: 'Kulbot',
                    description: 'The name of the arduino uno device pin category'
                }),
                color1: '#4C97FF',
                color2: '#3373CC',
                color3: '#3373CC',

                blocks: [
                    {
                        opcode: 'esp32ledOnOF',
                        text: formatMessage({
                            id: 'arduinokulbot.pins.esp32ledOnOF',
                            default: 'Led  [LEVEL]',
                            description: 'arduinokulbot set LED on/off'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            LEVEL: {
                                type: ArgumentType.STRING,
                                menu: 'level',
                                defaultValue: Level.High
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'eps32SUltra',
                        text: formatMessage({
                            id: 'arduinokulbot.pins.eps32SUltra',
                            default: 'Unltrasonic [PIN] (cm)',
                            description: 'arduinokulbot read ultrasonic sensor'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'digitalPins',
                                defaultValue: Pins.Port1
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'eps32STemp',
                        text: formatMessage({
                            id: 'arduinokulbot.pins.eps32STemp',
                            default: 'Temperature [PIN] (°C)',
                            description: 'arduinokulbot read Temperature sensor'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'digitalPins',
                                defaultValue: Pins.Port1
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'eps32SDHT11',
                        text: formatMessage({
                            id: 'arduinokulbot.pins.eps32SDHT11',
                            default: 'DHT11 [PIN] [FUN]',
                            description: 'arduinokulbot read Temperature sensor'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'digitalPins',
                                defaultValue: Pins.Port1
                            },
                            FUN: {
                                type: ArgumentType.STRING,
                                menu: 'dht11mode',
                                defaultValue: Dht11_mode.Temp
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'eps32SDHT12',
                        text: formatMessage({
                            id: 'arduinokulbot.pins.eps32SDHT12',
                            default: 'DHT12 [PIN] [FUN]',
                            description: 'arduinokulbot read Temperature sensor'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'digitalPins',
                                defaultValue: Pins.Port1
                            },
                            FUN: {
                                type: ArgumentType.STRING,
                                menu: 'dht11mode',
                                defaultValue: Dht11_mode.Temp
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'eps32STouch',
                        text: formatMessage({
                            id: 'arduinokulbot.pins.eps32STouch',
                            default: 'Touch [PIN]',
                            description: 'arduinokulbot read digital touch sensor'
                        }),
                        blockType: BlockType.BOOLEAN,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'digitalPins',
                                defaultValue: Pins.D0
                            }
                        }
                    },
                    '---',            
                    {
                        opcode: 'eps32STouchLed',
                        text: formatMessage({
                            id: 'arduinokulbot.pins.eps32STouchLed',
                            default: 'TouchLED Port [PIN]  color [CLINE]',
                            description: 'arduinokulbot set IR color pin out'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'digitalPins',
                                defaultValue: Pins.D0
                            },
                            CLINE: {
                                type: ArgumentType.NUMBER,
                                menu: 'color_s',
                                defaultValue: Color_X.None
                            }
                        }
                    },
                    '---',   
                    {
                        opcode: 'eps32SIR',
                        text: formatMessage({
                            id: 'arduinokulbot.pins.eps32SIR',
                            default: 'Sensor IR [PIN]',
                            description: 'arduinokulbot read digital IR sensor'
                        }),
                        blockType: BlockType.BOOLEAN,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'digitalPins',
                                defaultValue: Pins.D0
                            }
                        }
                    },
                    '---',     
                    {
                        opcode: 'eps32SLine',
                        text: formatMessage({
                            id: 'arduinokulbot.pins.eps32SLine',
                            default: 'Line [PIN] with line [VLE]',
                            description: 'arduinokulbot read digital IR sensor'
                        }),
                        blockType: BlockType.BOOLEAN,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'digitalPins',
                                defaultValue: Pins.D0
                            },
                            VLE: {
                                type: ArgumentType.STRING,
                                menu: 'linecolor',
                                defaultValue: Coline.CW
                            },
                        }
                    },
                    '---',            
                    {
                        opcode: 'eps32SIRLed',
                        text: formatMessage({
                            id: 'arduinokulbot.pins.eps32SIRLed',
                            default: 'IRLED Port [PIN] Led [VLE] color [CLINE]',
                            description: 'arduinokulbot set IR color pin out'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'digitalPins',
                                defaultValue: Pins.D0
                            },
                            VLE: {
                                type: ArgumentType.NUMBER,
                                menu: 'ircolor',
                                defaultValue:  Level_IRcolor.Right
                            },
                            CLINE: {
                                type: ArgumentType.NUMBER,
                                menu: 'color_s',
                                defaultValue: Color_X.None
                            }
                        }
                    },
                    '---',            
                    {
                        opcode: 'eps32traLED',
                        text: formatMessage({
                            id: 'arduinokulbot.pins.eps32traLED',
                            default: 'Traffic Port [PIN] Color [VLE] statue [CLINE]',
                            description: 'arduinokulbot set IR color pin out'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'digitalPins',
                                defaultValue: Pins.D0
                            },
                            VLE: {
                                type: ArgumentType.STRING,
                                menu: 'trafficolor',
                                defaultValue: Level_color.R
                            },
                            CLINE: {
                                type: ArgumentType.STRING,
                                menu: 'trafficstatue',
                                defaultValue: Level_statue.NONE
                            }
                        }
                    },
                    '---',            
                    {
                        opcode: 'eps32SMotorM1',
                        text: formatMessage({
                            id: 'arduinokulbot.pins.eps32SMotorM1',
                            default: 'Motor [MO]  [MoFB] out [OUT]',
                            description: 'arduinokulbot set motor pin out'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            MO: {
                                type: ArgumentType.STRING,
                                menu: 'motorPins',
                                defaultValue: Moption.M1
                            },
                            MoFB: {
                                type: ArgumentType.STRING,
                                menu: 'motorFB',
                                defaultValue: MFB.M1
                            },
                            OUT: {
                                type: ArgumentType.UINT8_NUMBER,
                                defaultValue: '0'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'eps32SServo',
                        text: formatMessage({
                            id: 'arduinokulbot.pins.eps32SServo',
                            default: 'Servo pin [PIN] out [OUT]',
                            description: 'arduinokulbot set servo pin out'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'digitalPins',
                                defaultValue: Pins.Port1
                            },
                            OUT: {
                                type: ArgumentType.ANGLE,
                                defaultValue: '90'
                            }
                        }
                    },

                    {
                        opcode: 'eps32SMotorM1H',
                        text: formatMessage({
                            id: 'arduinokulbot.pins.eps32SMotorM1H',
                            default: 'MotorH [MO]  [MoFB] out [OUT]',
                            description: 'arduinokulbot set motor pin out'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            MO: {
                                type: ArgumentType.STRING,
                                menu: 'motorPins',
                                defaultValue: Moption.M1
                            },
                            MoFB: {
                                type: ArgumentType.STRING,
                                menu: 'motorFB',
                                defaultValue: MFB.M1
                            },
                            OUT: {
                                type: ArgumentType.STRING,
                                defaultValue: '0'
                            }
                        }
                    }
                ],
                menus: {
                    pins: {
                        items: this.PINS_MENU
                    },
                    mode: {
                        items: this.MODE_MENU
                    },
                    digitalPins: {
                        items: this.DIGITAL_PINS_MENU
                    },
                    level: {
                        acceptReporters: true,
                        items: this.LEVEL_MENU
                    },
                    motorPins: {
                        items: this.LEVEL_Moption
                    },
                    motorFB: {
                        items: this.LEVEL_MFB
                    },
                    linecolor: {
                        items: this.LEVEL_Linecolor
                    },
                    trafficstatue: {
                        items: this.LEVEL_STATUE
                    },                    
                    trafficolor: {
                        items: this.LEVEL_COLOR
                    },
                    ircolor: {
                        items: this.LEVEL_IRCOLOR
                    },
                    dht11mode: {
                        items: this.LEVEL_DHT11
                    },
                    color_s: {
                        items: this.CoLor_X
                    },
                }
            },
            {
                id: 'serial',
                name: formatMessage({
                    id: 'arduinoUno.category.serial',
                    default: 'Serial',
                    description: 'The name of the arduino kulbot device serial category'
                }),
                color1: '#9966FF',
                color2: '#774DCB',
                color3: '#774DCB',

                blocks: [
                    {
                        opcode: 'esp32serialPrint',
                        text: formatMessage({
                            id: 'arduinokulbot.serial.esp32serialPrint',
                            default: 'serial print [VALUE] [EOL]',
                            description: 'arduinokulbot serial print'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            VALUE: {
                                type: ArgumentType.STRING,
                                defaultValue: 'Hello OpenBlock'
                            },
                            EOL: {
                                type: ArgumentType.STRING,
                                menu: 'eol',
                                defaultValue: Eol.Warp
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    {
                        opcode: 'esp32serialAvailable',
                        text: formatMessage({
                            id: 'arduinokulbot.serial.esp32serialAvailable',
                            default: 'serial available data length',
                            description: 'arduinoUno serial available data length'
                        }),
                        blockType: BlockType.REPORTER,
                        disableMonitor: true,
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    {
                        opcode: 'esp32serialReadData',
                        text: formatMessage({
                            id: 'arduinoUno.serial.esp32serialReadData',
                            default: 'serial read data',
                            description: 'arduinoUno serial read data'
                        }),
                        blockType: BlockType.REPORTER,
                        disableMonitor: true,
                        programMode: [ProgramModeType.UPLOAD]
                    }
                ],
                menus: {
                    baudrate: {
                        items: this.BAUDTATE_MENU
                    },
                    eol: {
                        items: this.EOL_MENU
                    }
                }
            },
            {
                id: 'data',
                name: formatMessage({
                    id: 'arduinoUno.category.data',
                    default: 'Data',
                    description: 'The name of the arduino uno device data category'
                }),
                color1: '#CF63CF',
                color2: '#C94FC9',
                color3: '#BD42BD',
                blocks: [
                    {
                        opcode: 'esp32dataMap',
                        text: formatMessage({
                            id: 'arduinoUno.data.esp32dataMap',
                            default: 'map [DATA] from ([ARG0], [ARG1]) to ([ARG2], [ARG3])',
                            description: 'arduinoUno data map'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            DATA: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '50'
                            },
                            ARG0: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '1'
                            },
                            ARG1: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '100'
                            },
                            ARG2: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '1'
                            },
                            ARG3: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '1000'
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    '---',
                    {
                        opcode: 'esp32dataConstrain',
                        text: formatMessage({
                            id: 'arduinoUno.data.esp32dataConstrain',
                            default: 'constrain [DATA] between ([ARG0], [ARG1])',
                            description: 'arduinoUno data constrain'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            DATA: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '50'
                            },
                            ARG0: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '1'
                            },
                            ARG1: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '100'
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    {
                        opcode: 'esp32dataConvert',
                        text: formatMessage({
                            id: 'arduinoUno.data.esp32dataConvert',
                            default: 'convert [DATA] to [TYPE]',
                            description: 'arduinoUno data convert'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            DATA: {
                                type: ArgumentType.STRING,
                                defaultValue: '123'
                            },
                            TYPE: {
                                type: ArgumentType.STRING,
                                menu: 'dataType',
                                defaultValue: DataType.WholeNumber
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    {
                        opcode: 'esp32dataConvertASCIICharacter',
                        text: formatMessage({
                            id: 'arduinoUno.data.esp32dataConvertASCIICharacter',
                            default: 'convert [DATA] to ASCII character',
                            description: 'arduinoUno data convert to ASCII character'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            DATA: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '97'
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    {
                        opcode: 'esp32dataConvertASCIINumber',
                        text: formatMessage({
                            id: 'arduinoUno.data.esp32dataConvertASCIINumber',
                            default: 'convert [DATA] to ASCII nubmer',
                            description: 'arduinoUno data convert to ASCII nubmer'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            DATA: {
                                type: ArgumentType.STRING,
                                defaultValue: 'a'
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },

                    
                ],
                menus: {
                    dataType: {
                        items: this.DATA_TYPE_MENU
                    }
                }
            }
        ];
    }

    /**
     * Set servo out put.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set servo out value is done.
     */
    setServoOutput (args) {
        this._peripheral.setServoOutput(args.PIN);
        return Promise.resolve();
    }

    /**
     * Set pin mode.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the return Ulstrasonic mode is done.
     */
     eps32SUltra (args) {
        this._peripheral.eps32SUltra(args.PIN);
        return Promise.resolve();
    }

    /**
     * Set pin mode.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the return Temperature mode is done.
     */
    eps32STemp (args) {
        this._peripheral.eps32STemp(args.PIN);
        return Promise.resolve();
    }

    /**
     * Set pin mode.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the return DHT11 mode is done.
     */
     eps32SDHT11 (args) {
            this._peripheral.eps32SDHT11(args.PIN, args.FUN);
            return Promise.resolve();
        }
    

    /**
     * Read touch sensor digital level.
     * @param {object} args - the block's arguments.
     * @return {boolean} - true if read high level, false if read low level.
     */
     eps32STouch (args) {
        return this._peripheral.eps32STouch(args.PIN);
    }

    /**
     * Set motor out value.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set motor value is done.
     */
    eps32SMotorM1 (args) {
        this._peripheral.eps32SMotorM1(args.MO, args.MoFB, args.OUT);
        return Promise.resolve();
    }

    /**
     * Set servo out put.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set servo out value is done.
     */
    eps32SServo (args) {
        this._peripheral.eps32SServo(args.PIN);
        return Promise.resolve();
    }

    /**
     * Set servo out put.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
    esp32ledOnOF (args) {
        this._peripheral.esp32ledOnOF(args.OUT);
        return Promise.resolve();
    }

    /**
     * Set motor out value.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set motor value is done.
     */
    eps32SMotorM1H (args) {
        this._peripheral.eps32SMotorM1H(args.MO, args.MoFB, args.OUT);
        return Promise.resolve();
    }
}

module.exports = OpenBlockArduinokulbotDevice;
