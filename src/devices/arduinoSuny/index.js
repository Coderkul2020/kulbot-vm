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
    fqbn: 'esp32:esp32:esp32:UploadSpeed=921600'
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

const Color = {
    Red: '0',
    Green: '1',
    Blue: '2',
    Clear: '3'
}

const Color_X = {
    None: '-1',
    Red: '0',
    Orange: '1',
    Yellow: '2',
    Green: '3',
    Blue: '4',
    Cyn: '5',
    Violet: '6',
    White: '7',
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
    Right: "0",
    Left: "1",
    All: "2"
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
    CB: '0'
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

const Method = {
    Get: '0',
    Post: '1',
    Delete: '2'
}


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

    get COLOR_MENU () {
        return [
            {
                text: 'Red',
                value: Color.Red
            },
            {
                text: 'Green',
                value: Color.Green
            },
            {
                text: 'Blue',
                value: Color.Blue
            },
            {
                text: 'Clear',
                value: Color.Clear
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
                text: 'Red',
                value: Color_X.Red
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

    get Type_Var(){
        return [
            {
                text: 'Character',
                value: 'char'
            },
            {
                text: 'Float',
                value: 'float'
            },
            {
                text: 'Integer',
                value: 'int'
            }
        ];
    }

    get LEVEL_Method(){
        return [
            {
                text: formatMessage({
                    id: 'arduinoSuny.levelMenu.get',
                    default: 'GET',
                    description: 'method get for http request'
                }),
                value: Method.Get
            },
            {
                text: formatMessage({
                    id: 'arduinoSuny.levelMenu.post',
                    default: 'POST',
                    description: 'method post for http request'
                }),
                value: Method.Post
            },
            {
                text: formatMessage({
                    id: 'arduinoSuny.levelMenu.delete',
                    default: 'DELETE',
                    description: 'method delete for http request'
                }),
                value: Method.Delete
            }
        ]
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
            //     //----------------------------------------Variable----------------------------------------//
            // {
            //     id: 'variable',
            //     name: formatMessage({
            //         id: 'arduinoSuny.category.variable',
            //         default: 'Variables',
            //         description: 'The name of the arduino uno device pin category'
            //     }),
            //     color1: '#B3B3FF',
            //     color2: '#8080FF',
            //     color3: '#8080FF',

            //     blocks: [
            //         {
            //             opcode: 'define',
            //             text: formatMessage({
            //                 id: 'arduinoSuny.variable.define',
            //                 default: 'Define: [NAME] Value [VALUE]',
            //                 description: 'arduinoSuny define variable'
            //             }),
            //             blockType: BlockType.COMMAND,
            //             arguments: {
            //                 NAME: {
            //                     type: ArgumentType.STRING,
            //                     defaultValue: 'LED_PIN'
            //                 },
            //                 VALUE: {
            //                     type: ArgumentType.STRING,
            //                     defaultValue: '13'
            //                 },
            //             }
            //         }, 
            //         {
            //             opcode: 'createvar',
            //             text: formatMessage({
            //                 id: 'arduinoSuny.variable.createvar',
            //                 default: 'Create A Variable: Type [TYPE]: Name [NAME]',
            //                 description: 'arduinoSuny create char variable'
            //             }),
            //             blockType: BlockType.COMMAND,
            //             arguments: {
            //                 TYPE: {
            //                     type: ArgumentType.STRING,
            //                     menu: 'type_var',
            //                     defaultValue: 'char'
            //                 },
            //                 NAME: {
            //                     type: ArgumentType.STRING,
            //                     defaultValue: 'a'
            //                 },
            //             }
            //         }, 
            //         {
            //             opcode: 'setvar',
            //             text: formatMessage({
            //                 id: 'arduinoSuny.variable.setvar',
            //                 default: 'Set Value Variable: [NAME] Value [VALUE]',
            //                 description: 'arduinoSuny set char variable'
            //             }),
            //             blockType: BlockType.COMMAND,
            //             arguments: {
            //                 NAME: {
            //                     type: ArgumentType.STRING,
            //                     defaultValue: 'c'
            //                 },
            //                 VALUE: {
            //                     type: ArgumentType.STRING,
            //                     defaultValue: 'NULL'
            //                 },
            //             }
            //         },
            //         {
            //             opcode: 'getvar',
            //             text: formatMessage({
            //                 id: 'arduinoSuny.variable.getvar',
            //                 default: 'Variable [NAME]',
            //                 description: 'arduinoSuny get char value'
            //             }),
            //             blockType: BlockType.REPORTER,
            //             arguments: {
            //                 NAME: {
            //                     type: ArgumentType.STRING,
            //                     defaultValue: ' '
            //                 },
            //             }
            //         },
            //     ],
            //     menus: {
            //         type_var: {
            //             items: this.Type_Var
            //         }
            //     }
            // },
            //----------------------------------------LED----------------------------------------//
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
                        opcode: 'esp32ledOn',
                        text: formatMessage({
                            id: 'arduinoSuny.pins.esp32ledOn',
                            default: 'Turn On Led: Port [PIN] Color [COLOR]',
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
                    {
                        opcode: 'esp32setIRLed',
                        text: formatMessage({
                            id: 'arduinoSuny.pins.esp32setIRLed',
                            default: 'Set IR Led: Port [PORT] Led [LED] Color [COLOR]',
                            description: 'arduinoSuny Set IR Led'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PORT: {
                                type: ArgumentType.STRING,
                                menu: 'digitalPins',
                                defaultValue: Pins.D0
                            },
                            LED: {
                                type: ArgumentType.STRING,
                                menu: 'ircolor',
                                defaultValue: Level_IRcolor.Right
                            },
                            COLOR: {
                                type: ArgumentType.STRING,
                                menu: 'button_led',
                                defaultValue: Button_Color.None
                            },
                        }
                    },
                    // '---',
                    // {
                    //     opcode: 'esp32setTrafficLight',
                    //     text: formatMessage({
                    //         id: 'arduinoSuny.pins.esp32setTrafficLight',
                    //         default: 'Set Traffic Light: Port [PORT] Color [COLOR] Status [STATUS]',
                    //         description: 'arduinoSuny print Number'
                    //     }),
                    //     blockType: BlockType.COMMAND,
                    //     arguments: {
                    //         PORT: {
                    //             type: ArgumentType.STRING,
                    //             menu: 'digitalPins',
                    //             defaultValue: Pins.D0
                    //         },
                    //         COLOR: {
                    //             type: ArgumentType.STRING,
                    //             menu: 'trafficolor',
                    //             defaultValue: Level_color.R
                    //         },
                    //         STATUS: {
                    //             type: ArgumentType.STRING,
                    //             menu: 'trafficstatue',
                    //             defaultValue: Level_statue.NONE
                    //         },
                                                     
                    //     }
                    // },
                    // '---',
                    // {
                    //     opcode: 'eps32SLight',
                    //     text: formatMessage({
                    //         id: 'arduinoSuny.pins.eps32SLight',
                    //         default: 'Get Light: Port [PIN]',
                    //         description: 'arduinoSuny read Light sensor'
                    //     }),
                    //     blockType: BlockType.REPORTER,
                    //     arguments: {
                    //         PIN: {
                    //             type: ArgumentType.STRING,
                    //             menu: 'digitalPins',
                    //             defaultValue: Pins.Port1
                    //         }
                    //     }
                    // },
                    // '---',
                    // {
                    //     opcode: 'eps32GetJoystick',
                    //     text: formatMessage({
                    //         id: 'arduinoSuny.pins.eps32GetJoystick',
                    //         default: 'Get Joystick: Port [PORT] type [TYPE]',
                    //         description: 'arduinoSuny read Joystick sensor'
                    //     }),
                    //     blockType: BlockType.REPORTER,
                    //     arguments: {
                    //         PORT: {
                    //             type: ArgumentType.STRING,
                    //             menu: 'digitalPins',
                    //             defaultValue: Pins.Port1
                    //         },
                    //         TYPE: {
                    //             type: ArgumentType.STRING,
                    //             menu: 'joystick_menu',
                    //             defaultValue: MFB.MF
                    //         }
                    //     }
                    // },
                    // '---',
                    // {
                    //     opcode: 'eps32Volume',
                    //     text: formatMessage({
                    //         id: 'arduinoSuny.pins.eps32Volume',
                    //         default: 'Get Volume: Port [PIN]',
                    //         description: 'arduinoSuny read Volume sensor'
                    //     }),
                    //     blockType: BlockType.REPORTER,
                    //     arguments: {
                    //         PIN: {
                    //             type: ArgumentType.STRING,
                    //             menu: 'digitalPins',
                    //             defaultValue: Pins.Port1
                    //         }
                    //     }
                    // },  
                    // '---',  
                    // {
                    //     opcode: 'eps32ButtonLed',
                    //     text: formatMessage({
                    //         id: 'arduinoSuny.pins.eps32ButtonLed',
                    //         default: 'Get Button Led: Port [PIN] Button [BUTTON]',
                    //         description: 'arduinoSuny read digital IR sensor'
                    //     }),
                    //     blockType: BlockType.BOOLEAN,
                    //     arguments: {
                    //         PIN: {
                    //             type: ArgumentType.STRING,
                    //             menu: 'digitalPins',
                    //             defaultValue: Pins.D0
                    //         },
                    //         BUTTON: {
                    //             type: ArgumentType.STRING,
                    //             menu: 'location',
                    //             defaultValue: location.Left
                    //         }
                    //     }
                    // },   
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
            //----------------------------------------Module----------------------------------------//
            {
                id: 'module',
                name: formatMessage({
                    id: 'arduinoSuny.category.module',
                    default: 'Module',
                    description: 'The name of the arduino uno device pin category'
                }),
                color1: '#B3B3FF',
                color2: '#8080FF',
                color3: '#8080FF',

                blocks: [
                    {
                        opcode: 'esp32setTrafficLight',
                        text: formatMessage({
                            id: 'arduinoSuny.module.esp32setTrafficLight',
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
                    {
                        opcode: 'eps32GetJoystick',
                        text: formatMessage({
                            id: 'arduinoSuny.module.eps32GetJoystick',
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
                    {
                        opcode: 'eps32Volume',
                        text: formatMessage({
                            id: 'arduinoSuny.module.eps32Volume',
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
                    {
                        opcode: 'eps32ButtonLed',
                        text: formatMessage({
                            id: 'arduinoSuny.module.eps32ButtonLed',
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
            //----------------------------------------Sensor----------------------------------------//
            {
                id: 'sensor',
                name: formatMessage({
                    id: 'arduinoSuny.category.sensor',
                    default: 'Sensor',
                    description: 'The name of the arduino Suny device serial category'
                }),
                color1: '#148F77',
                color2: '#10705C',
                color3: '#10705C',

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
                        opcode: 'eps32STempLM75',
                        text: formatMessage({
                            id: 'arduinoSuny.sensor.eps32STempLM75',
                            default: 'Get Temperature LM75: Port [PIN] (°C)',
                            description: 'arduinoSuny read Temperature LM75 sensor'
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
                        opcode: 'eps32SGetColor',
                        text: formatMessage({
                            id: 'arduinoSuny.sensor.eps32SGetColor',
                            default: 'Get Color: Port [PORT] Color [DATA]',
                            description: 'arduinoSuny read Color sensor'
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
                                menu: 'Color',
                                defaultValue: Color.Red
                            }
                        }
                    },
                    {
                        opcode: 'eps32SLight',
                        text: formatMessage({
                            id: 'arduinoSuny.sensor.eps32SLight',
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
                    {
                        opcode: 'eps32SGetLUX',
                        text: formatMessage({
                            id: 'arduinoSuny.sensor.eps32SGetLUX',
                            default: 'Get Lux: Port [PIN]',
                            description: 'arduinoSuny read Lux sensor'
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
                    {
                        opcode: 'eps32SGetBH1750',
                        text: formatMessage({
                            id: 'arduinoSuny.sensor.eps32SGetBH1750',
                            default: 'Get Lux BH1750: Port [PIN]',
                            description: 'arduinoSuny read Lux sensor'
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
                ],
                menus: {
                    Gryro: {
                        items: this.GRYRO_MENU
                    },
                    Color: {
                        items: this.COLOR_MENU
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
                    motorPins: {
                        items: this.LEVEL_Moption
                    },
                }
            },
            //----------------------------------------LCD----------------------------------------//
            {
                id: 'display',
                name: formatMessage({
                    id: 'arduinoSuny.category.display',
                    default: 'Display',
                    description: 'The name of the arduino Suny device Display category'
                }),
                color1: '#B99095',
                color2: '#9D6269',
                color3: '#9D6269',

                blocks: [  
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
                    digitalPins: {
                        items: this.DIGITAL_PINS_MENU
                    },
                }
            },
            //----------------------------------------Motor----------------------------------------//
            {
                id: 'motors',
                name: formatMessage({
                    id: 'arduinoSuny.category.motors',
                    default: 'Motions',
                    description: 'The name of the arduino Suny device serial category'
                }),
                color1: '#7CF3A0',
                color2: '#46B946',
                color3: '#46B946',

                blocks: [                              
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
                                type: ArgumentType.NUMBER,
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
                    },
                    '---',
                    {
                        opcode: 'eps32SSetPosiEncoder',
                        text: formatMessage({
                            id: 'arduinoSuny.motors.eps32SSetPosiEncoder',
                            default: 'Set Encoder: Port [MO] out [OUT]',
                            description: 'arduinoSuny set encoder pin out'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            MO: {
                                type: ArgumentType.STRING,
                                menu: 'motorPins',
                                defaultValue: Moption.M1
                            },
                            OUT: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            }
                        }
                    },
                    {
                        opcode: 'eps32SSetTuningEncoder',
                        text: formatMessage({
                            id: 'arduinoSuny.motors.eps32SSetTuningEncoder',
                            default: 'Set Tuning Encoder: Port [MO] P [P] I [I] D [D]',
                            description: 'arduinoSuny set tuning pid encoder'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            MO: {
                                type: ArgumentType.STRING,
                                menu: 'motorPins',
                                defaultValue: Moption.M1
                            },
                            P: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            },
                            I: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            },
                            D: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            },
                        }
                    },
                    {
                        opcode: 'eps32SGetPosiEncoder',
                        text: formatMessage({
                            id: 'arduinoSuny.motors.eps32SGetPosiEncoder',
                            default: 'Get Posi Encoder: Port [MO]',
                            description: 'arduinoSuny read current posi encoder'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            MO: {
                                type: ArgumentType.STRING,
                                menu: 'motorPins',
                                defaultValue: Moption.M1
                            }
                        }
                    },
                ],
                 menus: {
                    digitalPins: {
                        items: this.DIGITAL_PINS_MENU
                    },
                    motorPins: {
                        items: this.LEVEL_Moption
                    },
                    motorFB: {
                        items: this.LEVEL_MFB
                    },
                }
            },
            //----------------------------------------Serial----------------------------------------//
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
            //----------------------------------------Data----------------------------------------//
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
            //----------------------------------------Bluetooth----------------------------------------//
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
                        opcode: 'bluetoothPrint',
                        text: formatMessage({
                            id: 'arduinoSuny.bluetooth.bluetoothPrint',
                            default: 'Bluetooth Print [VALUE]',
                            description: 'arduinoSuny serial bluetooth print'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            VALUE: {
                                type: ArgumentType.STRING,
                                defaultValue: 'Hello Suny'
                            },
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
            },
            //----------------------------------------Wifi----------------------------------------//
            {
                id: 'wifi',
                name: formatMessage({
                    id: 'arduinoUno.category.wifi',
                    default: 'Wifi',
                    description: 'The name of the arduino uno device wifi category'
                }),
                color1: '#4CBFE6',
                color2: '#2E8EB8',
                color3: '#2E8EB8',
                blocks: [
                    {
                        opcode: 'setupwifi',
                        text: formatMessage({
                            id: 'arduinoSuny.wifi.setupwifi',
                            default: 'Initialize Wifi: SSID [SSID] PASSWORD [PASSWORD]',
                            description: 'arduinoSuny setup wifi station mode'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            SSID: {
                                type: ArgumentType.STRING,
                                defaultValue: 'Wifi name'
                            },
                            PASSWORD: {
                                type: ArgumentType.STRING,
                                defaultValue: 'Wifi password'
                            },
                        }
                    },
                    {
                        opcode: 'httpRequest',
                        text: formatMessage({
                            id: 'arduinoSuny.wifi.httpRequest',
                            default: 'HTTP Request: URL [URL] Method [METHOD] Data [DATA]',
                            description: 'arduinoSuny HTTP Request'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            URL: {
                                type: ArgumentType.STRING,
                                defaultValue: 'http://stemkul.com'
                            },
                            METHOD: {
                                type: ArgumentType.STRING,
                                menu: 'method',
                                defaultValue: '1'
                            },
                            DATA: {
                                type: ArgumentType.STRING,
                                defaultValue: 'Hello World'
                            }
                        }
                    }
                ],
                menus: {
                    method: {
                        items: this.LEVEL_Method
                    },
                }
            },
            //----------------------------------------Blynk----------------------------------------//
            {
                id: 'Blynk',
                name: formatMessage({
                    id: 'arduinoUno.category.Blynk',
                    default: 'Blynk',
                    description: 'Blynk is libary to build your own IoT product'
                }),
                menuIconURI: "https://avatars.githubusercontent.com/u/11541426?v=4",
                blockIconURI: "https://avatars.githubusercontent.com/u/11541426?v=4",
                blocks: [
                    {
                        opcode: 'defineBlynk',
                        text: formatMessage({
                            id: 'arduinoSuny.Blynk.defineBlynk',
                            default: 'Define Blynk: ID [ID] NAME [NAME] TOKEN [TOKEN]',
                            description: 'arduinoSuny define information from Blynk Device '
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            ID: {
                                type: ArgumentType.STRING,
                                defaultValue: 'id'
                            },
                            NAME: {
                                type: ArgumentType.STRING,
                                defaultValue: 'name'
                            },
                            TOKEN: {
                                type: ArgumentType.STRING,
                                defaultValue: 'token'
                            },
                        }
                    },
                    {
                        opcode: 'setupBlynk',
                        text: formatMessage({
                            id: 'arduinoSuny.Blynk.setupBlynk',
                            default: 'Setup Blynk: SSID [SSID] PASSWORD [PASSWORD]',
                            description: 'arduinoSuny setup Blynk connect wifi'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            SSID: {
                                type: ArgumentType.STRING,
                                defaultValue: 'Wifi name'
                            },
                            PASSWORD: {
                                type: ArgumentType.STRING,
                                defaultValue: 'Wifi password'
                            },
                        }
                    },
                    {
                        opcode: 'runBlynk',
                        text: formatMessage({
                            id: 'arduinoSuny.Blynk.runBlynk',
                            default: 'Run Blynk',
                            description: 'Run and Handle Blynk Event'
                        }),
                        blockType: BlockType.COMMAND
                    },
                    {
                        opcode: 'BlynkTimer',
                        text: formatMessage({
                            id: 'arduinoSuny.Blynk.BlynkTimer',
                            default: 'Blynk SetInterval: Time (ms) [MS] Function Name [FC]',
                            description: 'Setting interval to send data to Blynk Cloud'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            MS: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '1000'
                            },
                            FC: {
                                type: ArgumentType.STRING,
                                defaultValue: 'Func'
                            }
                        }
                    },
                    {
                        opcode: 'runTimer',
                        text: formatMessage({
                            id: 'arduinoSuny.Blynk.runTimer',
                            default: 'Run Timer',
                            description: 'Run and Handle Blynk Timer'
                        }),
                        blockType: BlockType.COMMAND
                    },
                    {
                        opcode: 'getBlynkData',
                        text: formatMessage({
                            id: 'arduinoSuny.Blynk.getBlynkData',
                            default: 'Get Data: Type [TYPE]',
                            description: 'Get Data Form Blynk Server'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            TYPE: {
                                type: ArgumentType.STRING,
                                menu: 'type_var',
                                defaultValue: 'int'
                            }
                        }
                    },
                    {
                        opcode: 'setBlynkData',
                        text: formatMessage({
                            id: 'arduinoSuny.Blynk.setBlynkData',
                            default: 'Set Virtual Pin: (0-255) [VPIN] Value [VALUE] ',
                            description: 'Get Data Form Blynk Server'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            VPIN: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            },
                            VALUE: {
                                type: ArgumentType.STRING,
                                defaultValue: '0'
                            }
                        }
                    },
                    {
                        opcode: 'BlynkEvents',
                        text: formatMessage({
                            id: 'arduinoSuny.Blynk.BlynkEvents',
                            default: 'Blynk Event: Event Code [CODE] Message [MESS] ',
                            description: 'Set Event for Blynk'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            CODE: {
                                type: ArgumentType.STRING,
                                defaultValue: 'code'
                            },
                            MESS: {
                                type: ArgumentType.STRING,
                                defaultValue: 'message'
                            }
                        }
                    },
                ],
                menus: {
                    type_var: {
                        items: this.Type_Var
                    }
                }
            },
            //----------------------------------------AI Vision----------------------------------------//
            // {
            //     id: 'AIVision',
            //     name: formatMessage({
            //         id: 'arduinoUno.category.AIVision',
            //         default: 'AI Vision',
            //         description: 'AI Vision feature'
            //     }),
            //     color1: '#e58e68',
            //     color2: '#d86e41',
            //     color3: '#d86e41',
            //     menuIconURI: "",
            //     blocks:
            //     [
            //         {
            //             opcode: 'CameraInit',
            //             text: formatMessage({
            //                 id: 'arduinoSuny.AIVision.CameraInit',
            //                 default: 'Camera AI Avaiable Port [PORT]',
            //                 description: 'Check connection of camera with Kulbot'
            //             }),
            //             blockType: BlockType.BOOLEAN,
            //             arguments: {
            //                 PORT: {
            //                     type: ArgumentType.STRING,
            //                     menu: 'pins',
            //                     defaultValue: Pins.Port1
            //                 },
            //             },
            //         },
            //         {
            //             opcode: 'CameraUpdate',
            //             text: formatMessage({
            //                 id: 'arduinoSuny.AIVision.CameraUpdate',
            //                 default: 'Update Camera Detect [PORT]',
            //                 description: 'Update result detect of camera'
            //             }),
            //             blockType: BlockType.COMMAND,
            //             arguments: {
            //                 PORT: {
            //                     type: ArgumentType.STRING,
            //                     menu: 'pins',
            //                     defaultValue: Pins.Port1
            //                 },
            //             },
            //         },
            //         {
            //             opcode: 'ResultDetect',
            //             text: formatMessage({
            //                 id: 'arduinoSuny.AIVision.ResultDetect',
            //                 default: 'IF Detect [LABEL] with Accuracy > [SCORE]',
            //                 description: 'arduinoSuny setup wifi station mode'
            //             }),
            //             blockType: BlockType.BOOLEAN,
            //             arguments: {
            //                 LABEL: {
            //                     type: ArgumentType.STRING,
            //                     defaultValue: 'Lable'
            //                 },
            //                 SCORE: {
            //                     type: ArgumentType.NUMBER,
            //                     defaultValue: 0
            //                 },
            //             },
            //         },
            //         '---',
            //         {
            //             opcode: 'NumberOfFaces',
            //             text: formatMessage({
            //                 id: 'arduinoSuny.AIVision.NumberOfFaces',
            //                 default: 'Number of faces',
            //                 description: 'Return number of faces on camera'
            //             }),
            //             blockType: BlockType.REPORTER,
            //             disableMonitor: true,
            //         },
            //         {
            //             opcode: 'DataOfFaces',
            //             text: formatMessage({
            //                 id: 'arduinoSuny.AIVision.DataOfFaces',
            //                 default: 'Get [DATA] of face',
            //                 description: 'Return data of faces on camera'
            //             }),
            //             blockType: BlockType.REPORTER,
            //             arguments: {
            //                 DATA: {
            //                     type: ArgumentType.STRING,
            //                     menu: 'face',
            //                     defaultValue: 'The X coordinate of the center'
            //                 }
            //             },
            //         },
            //         '---',
            //         {
            //             opcode: 'DataOfPose',
            //             text: formatMessage({
            //                 id: 'arduinoSuny.AIVision.DataOfPose',
            //                 default: 'Get [DATA] for [BODY]',
            //                 description: 'Return X/Y coordinate of body on camera'
            //             }),
            //             blockType: BlockType.REPORTER,
            //             arguments: {
            //                 DATA: {
            //                     type: ArgumentType.STRING,
            //                     menu: 'coordinates',
            //                     defaultValue: 'X'
            //                 },
            //                 BODY: {
            //                     type: ArgumentType.STRING,
            //                     menu: 'body',
            //                     defaultValue: 'Nose'
            //                 }
            //             },
            //         },

            //     ],
            //     menus: {
            //         pins: {
            //             items: this.PINS_MENU
            //         },
            //         face:[
            //             {
            //                 text: 'The X coordinate of the center',
            //                 value: 1
            //             },
            //             {
            //                 text: 'The Y coordinate of the center',
            //                 value: 2
            //             },
            //             {
            //                 text: 'Height of recognition frame',
            //                 value: 3
            //             },
            //             {
            //                 text: 'Width of recognition frame',
            //                 value: 4
            //             },
            //             {
            //                 text: 'Area of recognition frame',
            //                 value: 5
            //             },
            //         ],
            //         coordinates:[
            //             {
            //                 text: 'X coordinate',
            //                 value: 1
            //             },
            //             {
            //                 text: 'Y coordinate',
            //                 value: 2
            //             }, 
            //         ],
            //         body:[
            //             {
            //                 text: 'Nose',
            //                 value: 1
            //             },
            //             {
            //                 text: 'Right eye',
            //                 value: 2
            //             }, 
            //             {
            //                 text: 'Left eye',
            //                 value: 3
            //             },
            //             {
            //                 text: 'Right ear',
            //                 value: 4
            //             },
            //             {
            //                 text: 'Left ear',
            //                 value: 5
            //             },
            //             {
            //                 text: 'Right shoulder',
            //                 value: 6
            //             }, 
            //             {
            //                 text: 'Left shoulder',
            //                 value: 7
            //             },
            //             {
            //                 text: 'Right elbow',
            //                 value: 8
            //             },
            //             {
            //                 text: 'Left elbow',
            //                 value: 9
            //             },
            //             {
            //                 text: 'Right hand',
            //                 value: 10
            //             },
            //             {
            //                 text: 'Left hand',
            //                 value: 11
            //             },
            //             {
            //                 text: 'Right hip',
            //                 value: 12
            //             },
            //             {
            //                 text: 'Left hip',
            //                 value: 13
            //             },
            //             {
            //                 text: 'Right knee',
            //                 value: 14
            //             },
            //             {
            //                 text: 'Left knee',
            //                 value: 15
            //             },
            //             {
            //                 text: 'Right ankle',
            //                 value: 16
            //             },
            //             {
            //                 text: 'Left ankle',
            //                 value: 17
            //             },
            //         ]           
            //     }
            // }, 
            //----------------------------------------Teachable Machine----------------------------------------//
            {
                id: 'AIVision',
                name: formatMessage({
                    id: 'arduinoUno.category.AIVision',
                    default: 'Teachable Machine',
                    description: 'AI Vision feature'
                }),
                color1: '#8AB4F8',
                color2: '#1A73E8',
                color3: '#1A73E8',
                menuIconURI: "https://teachablemachine.withgoogle.com/assets/img/favicon.png",
                blockIconURI:"https://teachablemachine.withgoogle.com/assets/img/favicon.png",
                blocks:
                [
                    {
                        opcode: 'InitCamera',
                        text: formatMessage({
                            id: 'arduinoSuny.AIVision.InitCamera',
                            default: 'Initialize Camera AI Port [PORT]',
                            description: 'Initialize camera with Kulbot'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PORT: {
                                type: ArgumentType.NUMBER,
                                menu: 'pins',
                                defaultValue: Pins.Port1
                            },
                        },
                    },
                    {
                        opcode: 'UpdateDetect',
                        text: formatMessage({
                            id: 'arduinoSuny.AIVision.UpdateDetect',
                            default: 'Update Detect Result',
                            description: 'Update result detect of camera'
                        }),
                        blockType: BlockType.COMMAND
                    },
                    {
                        opcode: 'Detect',
                        text: formatMessage({
                            id: 'arduinoSuny.AIVision.Detect',
                            default: 'Detect [LABEL] with Accuracy > [SCORE]',
                            description: 'check result detect score'
                        }),
                        blockType: BlockType.BOOLEAN,
                        arguments: {
                            LABEL: {
                                type: ArgumentType.STRING,
                                defaultValue: 'lable'
                            },
                            SCORE: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                        },
                    },
                    {
                        opcode: 'ReadDetectResult',
                        text: formatMessage({
                            id: 'arduinoSuny.AIVision.ReadDetectResult',
                            default: 'Read Detect Result',
                            description: 'Return class name of detect'
                        }),
                        blockType: BlockType.REPORTER,
                        disableMonitor: true,
                    },
                    {
                        opcode: 'ReadDetectScore',
                        text: formatMessage({
                            id: 'arduinoSuny.AIVision.DataOfFaces',
                            default: 'Read Detect Score',
                            description: 'Return score of detect'
                        }),
                        blockType: BlockType.REPORTER,
                        disableMonitor: true,
                    },
                ],
                menus: {
                    pins: {
                        items: this.PINS_MENU
                    },       
                }
            }, 
            //--------------------------------------------------------------------------------//
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
     * Get Ultra sensor.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the return Ulstrasonic mode is done.
     */
     eps32SUltra (args) {
        this._peripheral.eps32SUltra(args.PIN);
        return Promise.resolve();
    }

    /**
     * Get Sonar sensor.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the return Temperature mode is done.
     */
     eps32GetSonarSensor (args) {
        this._peripheral.eps32GetSonarSensor(args.PIN);
        return Promise.resolve();
    }

    /**
     * Get temp sensor.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the return Temperature mode is done.
     */
    eps32STemp (args) {
        this._peripheral.eps32STemp(args.PIN);
        return Promise.resolve();
    }

    /**
     * Get temp LM75 sensor.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the return Temperature mode is done.
     */
    eps32STempLM75 (args) {
        this._peripheral.eps32STempLM75(args.PIN);
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
     * Set encoder posi.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
    eps32SSetPosiEncoder (args) {
        this._peripheral.eps32SSetPosiEncoder(args.MO, args.OUT);
        return Promise.resolve();
    }

    /**
     * Set encoder tuning.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
    eps32SSetTuningEncoder (args) {
        this._peripheral.eps32SSetTuningEncoder(args.MO, args.P, args.I, args.D);
        return Promise.resolve();
    }

    /**
     * Get encoder posi.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
    eps32SGetPosiEncoder (args) {
        this._peripheral.eps32SGetPosiEncoder(args.MO);
        return Promise.resolve();
    }

    /**
     * Set on led.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
     esp32ledOn (args) {
        this._peripheral.esp32ledOn(args.PIN, args.COLOR);
        return Promise.resolve();
    }

    /**
     * Set on all led out put.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
     esp32OnAllLed (args) {
        this._peripheral.esp32OnAllLed(args.PIN, args.COLOR);
        return Promise.resolve();
    }

    /**
     * Set off led
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
    esp32OffLed (args) {
        this._peripheral.esp32OffLed(args.PORT);
        return Promise.resolve();
    }    

    /**
     * Set off all led.
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
     * Print Number on LCD
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
     esp32lcdNumber (args) {
        this._peripheral.esp32lcdNumber(args.PORT, args.COL, args.CEL, args.NUMBER);
        return Promise.resolve();
    }

    /**
     * Set traffic light
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
     esp32setTrafficLight (args) {
        this._peripheral.esp32setTrafficLight(args.PORT, args.COLOR, args.STATUS);
        return Promise.resolve();
    }

    /**
     * Get light sensor
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
     eps32SLight (args) {
        this._peripheral.eps32SLight(args.PORT);
        return Promise.resolve();
    }

    /**
     * Get lux sensor
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
    eps32SGetLUX (args) {
        this._peripheral.eps32SGetLUX(args.PORT);
        return Promise.resolve();
    }

    /**
     * Get volume sensor
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
     eps32Volume (args) {
        this._peripheral.eps32Volume(args.PORT);
        return Promise.resolve();
    }

    /**
     * Set IR sensor led
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
     esp32setIRLed (args) {
        this._peripheral.esp32setIRLed(args.PORT, args.COLOR);
        return Promise.resolve();
    }

    /**
     * Initialize Hum Sensor
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
     * Initialize Color Sensor
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
    eps32SGetColor (args) {
        this._peripheral.eps32SGetColor(args.PORT, args.DATA);
        return Promise.resolve();
    }

    /**
     * Initialize Soil Hum Sensor
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
     eps32GetSoilHum (args) {
        this._peripheral.eps32GetSoilHum(args.PORT);
        return Promise.resolve();
    }

    /**
     * Initialize Gas Sensor
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
     * Bluetooth Read
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
    bluetoothRead () {
        this._peripheral.bluetoothRead();
        return Promise.resolve();
    }

    /**
     * Creat var char
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
    createvarchar (args) {
        this._peripheral.createvarchar(args.NAME, args.CHAR);
        return Promise.resolve();
    }

    /**
     * Set var char
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
    setvarchar (args) {
        this._peripheral.setvarchar(args.NAME, args.CHAR);
        return Promise.resolve();
    }
    /**
     * Get var char
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
    getvarchar (args) {
        this._peripheral.getvarchar(args.NAME);
        return Promise.resolve();
    }

    /**
     * Wifi Initialize
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
    setupwifi (args) {
        this._peripheral.setupwifi(args.SSID, args.PASSWORD);
        return Promise.resolve();
    }

    /**
     * http request
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
    httpRequest (args) {
        this._peripheral.httpRequest(args.URL, args.METHOD, args.DATA);
        return Promise.resolve();
    }

    // BLYNK IOT
    /**
     * Blynk Define 
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
    defineBlynk (args) {
        this._peripheral.defineBlynk(args.ID, args.NAME, args.TOKEN);
        return Promise.resolve();
    }

    /**
     * Blynk Initialize
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
    setupBlynk (args) {
        this._peripheral.setupBlynk(args.SSID, args.PASSWORD);
        return Promise.resolve();
    }

    /**
     * Blynk run
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
    runBlynk () {
        this._peripheral.runBlynk();
        return Promise.resolve();
    }

    /**
     * Blynk Initialize
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
    setupBlynk (args) {
        this._peripheral.setupBlynk(args.TOKEN, args.SSID, args.PASSWORD);
        return Promise.resolve();
    }

    /**
     * Blynk run
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
    runBlynk () {
        this._peripheral.runBlynk();
        return Promise.resolve();
    }

    /**
     * Blynk Timer
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
    BlynkTimer (args) {
        this._peripheral.BlynkTimer(args.MS, args.FC);
        return Promise.resolve();
    }

    /**
     * Blynk Timer
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
    runtimer () {
        this._peripheral.runtimer();
        return Promise.resolve();
    }

    /**
     * Blynk get data
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
    getBlynkData (args) {
        this._peripheral.getBlynkData(args.TYPE);
        return Promise.resolve();
    }

    /**
     * Blynk set data
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
    setBlynkData (args) {
        this._peripheral.setBlynkData(args.VPIN, args.VALUE);
        return Promise.resolve();
    }

    /**
     * Blynk event
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set Led out value is done.
     */
    BlynkEvents (args) {
        this._peripheral.BlynkEvents(args.CODE, args.MESS);
        return Promise.resolve();
    }

    // AI VISION
    /**
         * Init Camera AI
         * @param {object} args - the block's arguments.
         * @return {Promise} - a Promise that resolves after the set Led out value is done.
         */
    InitCamera (args) {
        this._peripheral.InitCamera(args.PORT);
        return Promise.resolve();
    }

    /**
         * Update Detect Result
         * @param {object} args - the block's arguments.
         * @return {Promise} - a Promise that resolves after the set Led out value is done.
         */
    UpdateDetect () {
        this._peripheral.UpdateDetect();
        return Promise.resolve();
    }

    /**
         * Detect Result
         * @param {object} args - the block's arguments.
         * @return {Promise} - a Promise that resolves after the set Led out value is done.
         */
    Detect (args) {
        this._peripheral.Detect(args.LABEL, args.SCORE);
        return Promise.resolve();
    }

    /**
         * Read Detect Result
         * @param {object} args - the block's arguments.
         * @return {Promise} - a Promise that resolves after the set Led out value is done.
         */
    ReadDetectResult () {
        this._peripheral.ReadDetectResult();
        return Promise.resolve();
    }

    /**
         * Read Detect Score
         * @param {object} args - the block's arguments.
         * @return {Promise} - a Promise that resolves after the set Led out value is done.
         */
    ReadDetectScore () {
        this._peripheral.ReadDetectScore();
        return Promise.resolve();
    }

}

module.exports = SunyArduinoSunyDevice;
