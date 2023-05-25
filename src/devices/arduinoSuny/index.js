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

const Gryro = {
    g1: '1',
    g2: '2',
    g3: '3',
    g4: '4',
    g5: '5',
    g6: '6',
    g7: '7',
    g8: '8',
    g9: '9',
    g10: '10',
    g11: '11'
};

const Color_X = {
    None: '-1',
    Red: '0',
    Orange: '1',
    Yellow: '2',
    Green: '3',
    Blue: '4',
    Indigo: '5',
    Violet: '6',
    White: '7',
    Black: '8',
};

const Button_Color = {
    None: '-1',
    Red: '0',
    Green: '1',
    Blue: '2',
    Yellow: '3',
    Cyn: '4',
    Violet: '5',
    White: '6',
};

const Level = {
    High: 'HIGH',
    Low: 'LOW'
};

const Level_statue = {
    ON: "0",
    NONE: "1"
};

const Level_color = {
    R: "0",
    G: "1",
    Y: "2"
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
    M1: '0',
    M2: '1'
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

const Location = {
    Left: '0',
    Right: '1',
};

/**
 * Manage communication with a Arduino Uno peripheral over a Suny Link client socket.
 */
class ArduinoSuny extends ArduinoPeripheral{
    /**
     * Construct a Arduino communication object.
     * @param {Runtime} runtime - the Suny runtime
     * @param {string} deviceId - the id of the extension
     * @param {string} originalDeviceId - the original id of the peripheral, like xxx_arduinoUno
     */
    constructor (runtime, deviceId, originalDeviceId) {
        super(runtime, deviceId, originalDeviceId, PNPID_LIST, SERIAL_CONFIG, DIVECE_OPT);
    }
}

/**
 * Suny blocks to interact with a Arduino Uno peripheral.
 */
class SunyArduinoSunyDevice {
    /**
     * @return {string} - the ID of this extension.
     */
    static get DEVICE_ID () {
        return 'arduinoSuny';
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

    get JOYSTICK_MENU () {
        return [
            {
                text: 'X',
                value: MFB.MF
            },
            {
                text: 'Y',
                value: MFB.MB
            }
        ];
    }

    get GRYRO_MENU () {
        return [
            {
                text: '1',
                value: Gryro.g1
            },
            {
                text: '2',
                value: Gryro.g2
            },
            {
                text: '3',
                value: Gryro.g3
            },
            {
                text: '4',
                value: Gryro.g4
            },
            {
                text: '5',
                value: Gryro.g5
            },
            {
                text: '6',
                value: Gryro.g6
            },
            {
                text: '7',
                value: Gryro.g7
            },
            {
                text: '8',
                value: Gryro.g8
            }
            ,
            {
                text: '9',
                value: Gryro.g9
            }
            ,
            {
                text: '10',
                value: Gryro.g10
            }
            ,
            {
                text: '11',
                value: Gryro.g11
            }
        ];
    }

    get Location () {
        return [
            {
                text: 'Left',
                value: Location.Left
            },
            {
                text: 'Right',
                value: Location.Right
            },
        ];
    }

    get MODE_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'arduinoSuny.modeMenu.input',
                    default: 'input',
                    description: 'label for input pin mode'
                }),
                value: Mode.Input
            },
            {
                text: formatMessage({
                    id: 'arduinoSuny.modeMenu.output',
                    default: 'output',
                    description: 'label for output pin mode'
                }),
                value: Mode.Output
            },
            {
                text: formatMessage({
                    id: 'arduinoSuny.modeMenu.inputPullup',
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
                text: 'Orange',
                value: Color_X.Orange
            },
            {
                text: 'Yellow',
                value: Color_X.Yellow
            },
            {
                text: 'Green',
                value: Color_X.Green
            },
            {
                text: 'Blue',
                value: Color_X.Blue
            },
            {
                text: 'Indigo',
                value: Color_X.Indigo
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
                text: 'Black',
                value: Color_X.Black
            }
        ];
    }


    get Button_Color () {
        return [
            {
                text: 'None',
                value: Button_Color.None
            },
            {
                text: 'Red',
                value: Button_Color.Red
            },
            {
                text: 'Green',
                value: Button_Color.Green
            },
            {
                text: 'Blue',
                value: Button_Color.Blue
            },
            {
                text: 'Yellow',
                value: Button_Color.Yellow
            },
            {
                text: 'Cyn',
                value: Button_Color.Cyn
            },
            {
                text: 'Violet',
                value: Button_Color.Violet
            },
            {
                text: 'White',
                value: Button_Color.White
            }
        ];
    }


    

    get LEVEL_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'arduinoSuny.levelMenu.high',
                    default: 'High',
                    description: 'label for high level'
                }),
                value: Level.High
            },
            {
                text: formatMessage({
                    id: 'arduinoSuny.levelMenu.low',
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
                    id: 'arduinoSuny.levelMenu.Temp',
                    default: 'Temperature (°C)',
                    description: 'label for Temp level'
                }),
                value: Dht11_mode.Temp
            },
            {
                text: formatMessage({
                    id: 'arduinoSuny.levelMenu.Hum',
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
                    id: 'arduinoSuny.levelMenu.R',
                    default: "R",
                    description: 'label for red level'
                }),
                value: Level_color.R
            },
            {
                text: formatMessage({
                    id: 'arduinoSuny.levelMenu.G',
                    default: "G",
                    description: 'label for green level'
                }),
                value: Level_color.G
            },
            {
                text: formatMessage({
                    id: 'arduinoSuny.levelMenu.B',
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
                    id: 'arduinoSuny.levelMenu.Right',
                    default: "Right",
                    description: 'label for Right level'
                }),
                value: Level_IRcolor.Right
            },
            {
                text: formatMessage({
                    id: 'arduinoSuny.levelMenu.Left',
                    default: "Left",
                    description: 'label for Left level'
                }),
                value: Level_IRcolor.Left
            },
            {
                text: formatMessage({
                    id: 'arduinoSuny.levelMenu.All',
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
                    id: 'arduinoSuny.levelMenu.m1',
                    default: 'M1',
                    description: 'label for high level'
                }),
                value: Moption.M1
            },
            {
                text: formatMessage({
                    id: 'arduinoSuny.levelMenu.m2',
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
                    id: 'arduinoSuny.levelMenu.ON',
                    default: "On",
                    description: 'On of the level'
                }),
                value: Level_statue.ON
            },
            {
                text: formatMessage({
                    id: 'arduinoSuny.levelMenu.NONE',
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
                    id: 'arduinoSuny.levelMenu.MF',
                    default: 'Front',
                    description: 'move Front of level'
                }),
                value: MFB.MF
            },
            {
                text: formatMessage({
                    id: 'arduinoSuny.levelMenu.MB',
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
                    id: 'arduinoSuny.levelMenu.CW',
                    default: 'Right',
                    description: 'move white color of level'
                }),
                value: Coline.CW
            },
            {
                text: formatMessage({
                    id: 'arduinoSuny.levelMenu.CB',
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
                    id: 'arduinoSuny.eolMenu.warp',
                    default: 'wrap',
                    description: 'label for warp print'
                }),
                value: Eol.Warp
            },
            {
                text: formatMessage({
                    id: 'arduinoSuny.eolMenu.noWarp',
                    default: 'no-wrap',
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
                    id: 'arduinoSuny.dataTypeMenu.wholeNumber',
                    default: 'whole number',
                    description: 'label for whole number'
                }),
                value: DataType.WholeNumber
            },
            {
                text: formatMessage({
                    id: 'arduinoSuny.dataTypeMenu.decimal',
                    default: 'decimal',
                    description: 'label for decimal number'
                }),
                value: DataType.Decimal
            },
            {
                text: formatMessage({
                    id: 'arduinoSuny.dataTypeMenu.string',
                    default: 'string',
                    description: 'label for string'
                }),
                value: DataType.String
            }
        ];
    }

    /**
     * Construct a set of Arduino blocks.
     * @param {Runtime} runtime - the Suny runtime.
     * @param {string} originalDeviceId - the original id of the peripheral, like xxx_arduinoUno
     */
    constructor (runtime, originalDeviceId) {
        /**
         * The Suny runtime.
         * @type {Runtime}
         */
        this.runtime = runtime;

        // Create a new Arduino uno peripheral instance
        this._peripheral = new ArduinoSuny(this.runtime, SunyArduinoSunyDevice.DEVICE_ID, originalDeviceId);
    }

    /**
     * @returns {Array.<object>} metadata for this extension and its blocks.
     */
    getInfo () {
        return [
            {
                id: 'variable',
                name: formatMessage({
                    id: 'arduinoSuny.category.variable',
                    default: 'Variables',
                    description: 'The name of the arduino uno device pin category'
                }),
                color1: '#B3B3FF',
                color2: '#3373CC',
                color3: '#3373CC',

                blocks: [
                    {
                        opcode: 'createvarchar',
                        text: formatMessage({
                            id: 'arduinoSuny.variable.createvarchar',
                            default: 'Create A Char: Name [NAME] Char [CHAR]',
                            description: 'arduinoSuny create char variable'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            NAME: {
                                type: ArgumentType.STRING,
                                defaultValue: 'c'
                            },
                            CHAR: {
                                type: ArgumentType.STRING,
                                defaultValue: 'NULL'
                            },
                        }
                    }, 
                    {
                        opcode: 'setvarchar',
                        text: formatMessage({
                            id: 'arduinoSuny.variable.setvarchar',
                            default: 'Set Char Variable [NAME] Character [CHAR]',
                            description: 'arduinoSuny set char variable'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            NAME: {
                                type: ArgumentType.STRING,
                                defaultValue: 'c'
                            },
                            CHAR: {
                                type: ArgumentType.STRING,
                                defaultValue: 'NULL'
                            },
                        }
                    },
                    {
                        opcode: 'getvarchar',
                        text: formatMessage({
                            id: 'arduinoSuny.variable.getvarchar',
                            default: 'Get Char [NAME]',
                            description: 'arduinoSuny get char value'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            NAME: {
                                type: ArgumentType.STRING,
                                defaultValue: ' '
                            },
                        }
                    },
                ],
                menus: {
                    
                }
            },
            {
                id: 'pin',
                name: formatMessage({
                    id: 'arduinoSuny.category.pins',
                    default: 'LED',
                    description: 'The name of the arduino uno device pin category'
                }),
                color1: '#4C97FF',
                color2: '#3373CC',
                color3: '#3373CC',

                blocks: [
                    {
                        opcode: 'esp32setButtonLed',
                        text: formatMessage({
                            id: 'arduinoSuny.pins.esp32setButtonLed',
                            default: 'Set Button Led: Port [PORT] Color [COLOR]',
                            description: 'arduinoSuny Set Button Led'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PORT: {
                                type: ArgumentType.STRING,
                                menu: 'digitalPins',
                                defaultValue: Pins.D0
                            },
                            COLOR: {
                                type: ArgumentType.STRING,
                                menu: 'button_led',
                                defaultValue: Button_Color.None
                            },
                        }
                    },
                    '---',
                    {
                        opcode: 'esp32setIRLed',
                        text: formatMessage({
                            id: 'arduinoSuny.pins.esp32setIRLed',
                            default: 'Set IR Led: Port [PORT] Color [COLOR]',
                            description: 'arduinoSuny Set IR Led'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PORT: {
                                type: ArgumentType.STRING,
                                menu: 'digitalPins',
                                defaultValue: Pins.D0
                            },
                            COLOR: {
                                type: ArgumentType.STRING,
                                menu: 'ircolor',
                                defaultValue: Level_IRcolor.Right
                            },
                        }
                    },
                    '---',
                    {
                        opcode: 'esp32setTrafficLight',
                        text: formatMessage({
                            id: 'arduinoSuny.pins.esp32setTrafficLight',
                            default: 'Set Traffic Light: Port [PORT] Color [COLOR] Status [STATUS]',
                            description: 'arduinoSuny print Number'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PORT: {
                                type: ArgumentType.STRING,
                                menu: 'digitalPins',
                                defaultValue: Pins.D0
                            },
                            COLOR: {
                                type: ArgumentType.STRING,
                                menu: 'trafficolor',
                                defaultValue: Level_color.R
                            },
                            STATUS: {
                                type: ArgumentType.STRING,
                                menu: 'trafficstatue',
                                defaultValue: Level_statue.NONE
                            },
                                                     
                        }
                    },
                    '---',
                    {
                        opcode: 'esp32OnAllLed',
                        text: formatMessage({
                            id: 'arduinoSuny.pins.esp32OnAllLed',
                            default: 'Turn On All Led: Color [COLOR]',
                            description: 'arduinoSuny turn on all leds'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            COLOR: {
                                type: ArgumentType.STRING,
                                menu: 'color_s',
                                defaultValue: Color_X.None
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'esp32OffLed',
                        text: formatMessage({
                            id: 'arduinoSuny.pins.esp32OffLed',
                            default: 'Turn Off Led: Port [PORT]',
                            description: 'arduinoSuny turn off leds'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PORT: {
                                type: ArgumentType.STRING,
                                menu: 'digitalPins',
                                defaultValue: Pins.Port1
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'esp32OffAllLed',
                        text: formatMessage({
                            id: 'arduinoSuny.pins.esp32OffAllLed',
                            default: 'Turn Off All Led',
                            description: 'arduinoSuny turn off all leds'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            
                        }
                    },
                    '---',
                    {
                        opcode: 'esp32ledOn',
                        text: formatMessage({
                            id: 'arduinoSuny.pins.esp32ledOn',
                            default: 'Led On: Port [PIN] Color [COLOR]',
                            description: 'arduinoSuny set LED at port'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'digitalPins',
                                defaultValue: Pins.Port1
                            },
                            COLOR: {
                                type: ArgumentType.STRING,
                                menu: 'color_s',
                                defaultValue: Color_X.None
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'eps32SLight',
                        text: formatMessage({
                            id: 'arduinoSuny.pins.eps32SLight',
                            default: 'Get Light: Port [PIN]',
                            description: 'arduinoSuny read Light sensor'
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
                        opcode: 'eps32GetJoystick',
                        text: formatMessage({
                            id: 'arduinoSuny.pins.eps32GetJoystick',
                            default: 'Get Joystick: Port [PORT] type [TYPE]',
                            description: 'arduinoSuny read Joystick sensor'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            PORT: {
                                type: ArgumentType.STRING,
                                menu: 'digitalPins',
                                defaultValue: Pins.Port1
                            },
                            TYPE: {
                                type: ArgumentType.STRING,
                                menu: 'joystick_menu',
                                defaultValue: MFB.MF
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'eps32Volume',
                        text: formatMessage({
                            id: 'arduinoSuny.pins.eps32Volume',
                            default: 'Get Volume: Port [PIN]',
                            description: 'arduinoSuny read Volume sensor'
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
                        opcode: 'eps32ButtonLed',
                        text: formatMessage({
                            id: 'arduinoSuny.pins.eps32ButtonLed',
                            default: 'Get Button Led: Port [PIN] Button [BUTTON]',
                            description: 'arduinoSuny read digital IR sensor'
                        }),
                        blockType: BlockType.BOOLEAN,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'digitalPins',
                                defaultValue: Pins.D0
                            },
                            BUTTON: {
                                type: ArgumentType.STRING,
                                menu: 'location',
                                defaultValue: location.Left
                            }
                        }
                    },   
                ],
                menus: {
                    button_led: {
                        items: this.Button_Color
                    },
                    Gryro: {
                        items: this.GRYRO_MENU
                    },
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
                    location: {
                        items: this.Location
                    },
                    joystick_menu: {
                        items: this.JOYSTICK_MENU
                    },
                }
            },
            {
                id: 'display',
                name: formatMessage({
                    id: 'arduinoSuny.category.display',
                    default: 'Display',
                    description: 'The name of the arduino Suny device Display category'
                }),
                color1: '#B99095',
                color2: '#9966FF',
                color3: '#9966FF',

                blocks: [  
                    '---',
                    {
                        opcode: 'esp32lcdNumber',
                        text: formatMessage({
                            id: 'arduinoSuny.display.esp32lcdNumber',
                            default: 'LCD Print Number: Port [PORT] Column [COL] Cell [CEL] Number [NUMBER]',
                            description: 'arduinoSuny print Number'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PORT: {
                                type: ArgumentType.NUMBER,
                                menu: 'digitalPins',
                                defaultValue: Pins.D0
                            },
                            COL: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            CEL: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            NUMBER: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },                          
                        }
                    },
                    '---',
                    {
                        opcode: 'esp32lcdString',
                        text: formatMessage({
                            id: 'arduinoSuny.display.esp32lcdString',
                            default: 'LCD Print String: Port [PORT] Column [COL] Cell [CEL] String [DATA]',
                            description: 'arduinoSuny print string'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PORT: {
                                type: ArgumentType.STRING,
                                menu: 'digitalPins',
                                defaultValue: Pins.D0
                            },
                            COL: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            CEL: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            DATA: {
                                type: ArgumentType.STRING,
                                defaultValue: 'Hello!!!'
                            },                          
                        }
                    },
                    '---',
                    {
                        opcode: 'esp32lcdClear',
                        text: formatMessage({
                            id: 'arduinoSuny.display.esp32lcdClear',
                            default: 'LCD Clear: Port [PORT]',
                            description: 'arduinoSuny LCD Clear'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PORT: {
                                type: ArgumentType.NUMBER,
                                menu: 'digitalPins',
                                defaultValue: Pins.D0
                            }
                                                 
                        }
                    },
                ],
                menus: {
                    button_led: {
                        items: this.Button_Color
                    },
                    Gryro: {
                        items: this.GRYRO_MENU
                    },
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
                    location: {
                        items: this.Location
                    },
                    joystick_menu: {
                        items: this.JOYSTICK_MENU
                    },
                }
            },
            {
                id: 'motors',
                name: formatMessage({
                    id: 'arduinoSuny.category.motors',
                    default: 'Motions',
                    description: 'The name of the arduino Suny device serial category'
                }),
                color1: '#7CF3A0',
                color2: '#9966FF',
                color3: '#9966FF',

                blocks: [  
                    '---',
                    //         
                             
                    {
                        opcode: 'eps32SMotorM1',
                        text: formatMessage({
                            id: 'arduinoSuny.motors.eps32SMotorM1',
                            default: 'Motor1: Port [MO] [MoFB] out [OUT]',
                            description: 'arduinoSuny set motor pin out'
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
                            id: 'arduinoSuny.motors.eps32SServo',
                            default: 'Servo: Port [PIN] out [OUT]',
                            description: 'arduinoSuny set servo pin out'
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
                    }

                ],
                 menus: {
                    button_led: {
                        items: this.Button_Color
                    },
                    Gryro: {
                        items: this.GRYRO_MENU
                    },
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
                    location: {
                        items: this.Location
                    },
                    joystick_menu: {
                        items: this.JOYSTICK_MENU
                    },
                }
            },
            {
                id: 'sensor',
                name: formatMessage({
                    id: 'arduinoSuny.category.sensor',
                    default: 'Sensor',
                    description: 'The name of the arduino Suny device serial category'
                }),
                color1: '#148F77',
                color2: '#9966FF',
                color3: '#9966FF',

                blocks: [   
                    {
         
                        opcode: 'eps32SUltra',
                        text: formatMessage({
                            id: 'arduinoSuny.sensor.eps32SUltra',
                            default: 'Unltrasonic [PIN] (cm)',
                            description: 'arduinoSuny read ultrasonic sensor'
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
                        opcode: 'eps32SLine',
                        text: formatMessage({
                            id: 'arduinoSuny.sensor.eps32SLine',
                            default: 'Get Line: Port [PIN] with line [VLE]',
                            description: 'arduinoSuny read digital IR sensor'
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
                        opcode: 'eps32SIR',
                        text: formatMessage({
                            id: 'arduinoSuny.sensor.eps32SIR',
                            default: 'Get Sensor IR: Port[PIN]',
                            description: 'arduinoSuny read digital IR sensor'
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
                        opcode: 'eps32STemp',
                        text: formatMessage({
                            id: 'arduinoSuny.sensor.eps32STemp',
                            default: 'Get Temperature: Port [PIN] (°C)',
                            description: 'arduinoSuny read Temperature sensor'
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
                        opcode: 'eps32GetSoilHum',
                        text: formatMessage({
                            id: 'arduinoSuny.sensor.eps32GetSoilHum',
                            default: 'Get Soil Hum: Port [PORT]',
                            description: 'arduinoSuny read Soil Hum sensor'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            PORT: {
                                type: ArgumentType.STRING,
                                menu: 'digitalPins',
                                defaultValue: Pins.Port1
                            }
                        }
                    },

                    '---',
                    {
                        opcode: 'eps32GetGas',
                        text: formatMessage({
                            id: 'arduinoSuny.sensor.eps32GetGas',
                            default: 'Get Gas: Port [PORT]',
                            description: 'arduinoSuny read Gas sensor'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            PORT: {
                                type: ArgumentType.STRING,
                                menu: 'digitalPins',
                                defaultValue: Pins.Port1
                            }
                        }
                    },
                    '---', 
                    {
                        opcode: 'eps32STouch',
                        text: formatMessage({
                            id: 'arduinoSuny.sensor.eps32STouch',
                            default: 'Get Touch: Port [PIN]',
                            description: 'arduinoSuny read digital touch sensor'
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
                        opcode: 'eps32SGryro',
                        text: formatMessage({
                            id: 'arduinoSuny.sensor.eps32SGryro',
                            default: 'Get Gryro: Port [PORT] Data [DATA]',
                            description: 'arduinoSuny read Gryro sensor'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            PORT: {
                                type: ArgumentType.STRING,
                                menu: 'digitalPins',
                                defaultValue: Pins.Port1
                            },
                            DATA: {
                                type: ArgumentType.STRING,
                                menu: 'Gryro',
                                defaultValue: Gryro.g1
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'eps32SHum',
                        text: formatMessage({
                            id: 'arduinoSuny.sensor.eps32SHum',
                            default: 'Get Hum Port [PORT]',
                            description: 'arduinoSuny read Hum sensor'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            PORT: {
                                type: ArgumentType.STRING,
                                menu: 'digitalPins',
                                defaultValue: Pins.Port1
                            }
                        }
                    },
                    
                ],
                menus: {
                    Gryro: {
                        items: this.GRYRO_MENU
                    },
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
                    linecolor: {
                        items: this.LEVEL_Linecolor
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
                    location: {
                        items: this.Location
                    },
                    joystick_menu: {
                        items: this.JOYSTICK_MENU
                    },
                }
            },
            {
                id: 'serial',
                name: formatMessage({
                    id: 'arduinoUno.category.serial',
                    default: 'Serial',
                    description: 'The name of the arduino Suny device serial category'
                }),
                color1: '#9966FF',
                color2: '#774DCB',
                color3: '#774DCB',

                blocks: [
                    {
                        opcode: 'esp32serialPrint',
                        text: formatMessage({
                            id: 'arduinoSuny.serial.esp32serialPrint',
                            default: 'Serial Print [VALUE] [EOL]',
                            description: 'arduinoSuny serial print'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            VALUE: {
                                type: ArgumentType.STRING,
                                defaultValue: 'Hello Suny'
                            },
                            EOL: {
                                type: ArgumentType.STRING,
                                menu: 'eol',
                                defaultValue: Eol.Warp
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    '---',
                    {
                        opcode: 'esp32serialAvailable',
                        text: formatMessage({
                            id: 'arduinoSuny.serial.esp32serialAvailable',
                            default: 'Serial Available Data Length',
                            description: 'arduinoUno serial available data length'
                        }),
                        blockType: BlockType.REPORTER,
                        disableMonitor: true,
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    '---',
                    {
                        opcode: 'esp32serialReadData',
                        text: formatMessage({
                            id: 'arduinoUno.serial.esp32serialReadData',
                            default: 'Serial Read Data',
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
                            default: 'Map [DATA] From ([ARG0], [ARG1]) to ([ARG2], [ARG3])',
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
                            default: 'Constrain [DATA] Between ([ARG0], [ARG1])',
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
                    '---',
                    {
                        opcode: 'esp32dataConvert',
                        text: formatMessage({
                            id: 'arduinoUno.data.esp32dataConvert',
                            default: 'Convert [DATA] to [TYPE]',
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
                    '---',
                    {
                        opcode: 'esp32dataConvertASCIICharacter',
                        text: formatMessage({
                            id: 'arduinoUno.data.esp32dataConvertASCIICharacter',
                            default: 'Convert [DATA] to ASCII character',
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
                    '---',
                    {
                        opcode: 'esp32dataConvertASCIINumber',
                        text: formatMessage({
                            id: 'arduinoUno.data.esp32dataConvertASCIINumber',
                            default: 'Convert [DATA] to ASCII nubmer',
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
                    }
                ],
                menus: {
                    dataType: {
                        items: this.DATA_TYPE_MENU
                    }
                }
            },
            {
                id: 'bluetooth',
                name: formatMessage({
                    id: 'arduinoUno.category.bluetooth',
                    default: 'Bluetooth',
                    description: 'The name of the arduino uno device bluetooth category'
                }),
                color1: '#CC0000',
                color2: '#C94FC9',
                color3: '#BD42BD',
                blocks: [
                    {
                        opcode: 'setupbluetooth',
                        text: formatMessage({
                            id: 'arduinoSuny.bluetooth.setupbluetooth',
                            default: 'Initialize Bluetooth: Name [NAME]',
                            description: 'arduinoSuny read digital touch sensor'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            NAME: {
                                type: ArgumentType.STRING,
                                defaultValue: 'Bluetooth name'
                            }
                        }
                    },
                    {
                        opcode: 'bluetoothAvailable',
                        text: formatMessage({
                            id: 'arduinoSuny.bluetooth.bluetoothAvailable',
                            default: 'Bluetooth Available',
                            description: 'arduinoSuny read digital bluetooth Available'
                        }),
                        blockType: BlockType.BOOLEAN,
                        arguments: {
                        },
                        disableMonitor: true,
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    {
                        opcode: 'bluetoothRead',
                        text: formatMessage({
                            id: 'arduinoSuny.bluetooth.bluetoothRead',
                            default: 'Bluetooth Read',
                            description: 'arduinoSuny read digital bluetooth Read'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {

                        },
                        disableMonitor: true,
                        programMode: [ProgramModeType.UPLOAD]
                    }
                    
                ],
                menus: {
                    Gryro: {
                        items: this.GRYRO_MENU
                    },
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
                    linecolor: {
                        items: this.LEVEL_Linecolor
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
                    location: {
                        items: this.Location
                    },
                    joystick_menu: {
                        items: this.JOYSTICK_MENU
                    },
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
     eps32GetSonarSensor (args) {
        this._peripheral.eps32GetSonarSensor(args.PIN);
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
     esp32ledOn (args) {
        this._peripheral.esp32ledOn(args.PIN, args.COLOR);
        return Promise.resolve();
    }

    /**
     * Set servo out put.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
     esp32OnAllLed (args) {
        this._peripheral.esp32OnAllLed(args.PIN, args.COLOR);
        return Promise.resolve();
    }

    /**
     * Set servo out put.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
     esp32OffAllLed (args) {
        this._peripheral.esp32OffAllLed(args.PIN, args.COLOR);
        return Promise.resolve();
    }


    /**
     * Print String on LCD
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
     esp32lcdString (args) {
        this._peripheral.esp32lcdString(args.PORT, args.COL, args.CEL, args.DATA);
        return Promise.resolve();
    }

    /**
     * Print String on LCD
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
     esp32lcdNumber (args) {
        this._peripheral.esp32lcdNumber(args.PORT, args.COL, args.CEL, args.NUMBER);
        return Promise.resolve();
    }

    /**
     * Print String on LCD
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
     esp32setTrafficLight (args) {
        this._peripheral.esp32setTrafficLight(args.PORT, args.COLOR, args.STATUS);
        return Promise.resolve();
    }

    /**
     * Print String on LCD
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
     eps32SLight (args) {
        this._peripheral.eps32SLight(args.PORT);
        return Promise.resolve();
    }

    /**
     * Print String on LCD
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
     eps32Volume (args) {
        this._peripheral.eps32Volume(args.PORT);
        return Promise.resolve();
    }

    /**
     * Print String on LCD
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
     esp32setIRLed (args) {
        this._peripheral.esp32setIRLed(args.PORT, args.COLOR);
        return Promise.resolve();
    }

    /**
     * Initialize Gas Sensor
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
     eps32SHum (args) {
        this._peripheral.eps32SHum(args.PORT);
        return Promise.resolve();
    }

    /**
     * Initialize Gryro Sensor
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
     eps32SGryro (args) {
        this._peripheral.eps32SGryro(args.PORT, args.DATA);
        return Promise.resolve();
    }

    /**
     * Initialize Gryro Sensor
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
     eps32GetSoilHum (args) {
        this._peripheral.eps32GetSoilHum(args.PORT);
        return Promise.resolve();
    }

    /**
     * Initialize Gryro Sensor
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
     eps32GetGas (args) {
        this._peripheral.eps32GetGas(args.PORT);
        return Promise.resolve();
    }

    /**
     * Initialize Joystick Sensor
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
     eps32GetJoystick (args) {
        this._peripheral.eps32GetJoystick(args.PORT, args.TYPE);
        return Promise.resolve();
    }

    /**
     * Initialize set Button Led
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
     esp32setButtonLed (args) {
        this._peripheral.esp32setButtonLed(args.PORT, args.COLOR);
        return Promise.resolve();
    }

    /**
     * LCD Clear
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
     esp32lcdClear (args) {
        this._peripheral.esp32lcdClear(args.PORT);
        return Promise.resolve();
    }

    /**
     * LCD Clear
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
     esp32OffLed (args) {
        this._peripheral.esp32OffLed(args.PORT);
        return Promise.resolve();
    }

    /**
     * Bluetooth Initialize
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
    setupbluetooth (args) {
        this._peripheral.setupbluetooth(args.NAME);
        return Promise.resolve();
    }

    /**
     * Bluetooth Available
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
    bluetoothAvailable () {
        this._peripheral.bluetoothAvailable();
        return Promise.resolve();
    }

    /**
     * Bluetooth Available
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
    bluetoothRead () {
        this._peripheral.bluetoothRead();
        return Promise.resolve();
    }

    /**
     * Bluetooth Available
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
    createvarchar (args) {
        this._peripheral.createvarchar(args.NAME, args.CHAR);
        return Promise.resolve();
    }

    /**
     * Bluetooth Available
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
    setvarchar (args) {
        this._peripheral.setvarchar(args.NAME, args.CHAR);
        return Promise.resolve();
    }
    /**
     * Bluetooth Available
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
    getvarchar (args) {
        this._peripheral.getvarchar(args.NAME);
        return Promise.resolve();
    }
}

module.exports = SunyArduinoSunyDevice;
