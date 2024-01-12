import mqtt from "mqtt";
import { useState } from "react";
import { TbAirConditioning } from "react-icons/tb";
import { MdEmojiPeople } from "react-icons/md";
import { MdOutlineDeviceUnknown } from "react-icons/md"
import { GiPowerLightning } from "react-icons/gi";

const options = {
    host: 'localhost',
    port: 1884,
    protocol: 'mqtt',
    topic: ["topic1", "topic2", "topic3", "topic4","statusTopic2"],
    id: 'ADMIN'
}
const mqttConnect = mqtt.connect(options);
const mqttSubcribe = mqttConnect.subscribe(options.topic);
const mqttUpdate = mqttConnect.publish("statusTopic", "1");
const now = new Date().toLocaleString();



const DeviceManager = () => {

    mqttConnect
    
    setInterval(mqttUpdate , 100)

    
    const mqttSubcribe = mqttConnect.subscribe(options.topic);

    // mqttSubcribe.on('message', function (topic, message) {
    //     if(topic.toString("statusTopic2")){
    //         let bin = message.toString()
    //         let mes = bin.split('').map(bit => parseInt(bit))
    //         for (let i = 0; i < mes.length; i++){
    //             if(i == 0) {
    //                 if(mes[i] == 0) {setButton1(false)}
    //                 else if(mes[i] == 1) {setButton1(true)}
    //             }
    //             if(i == 1) {
    //                 if(mes[i] == 0) {setButton2(false)}
    //                 else if(mes[i] == 1) {setButton2(true)}
    //             }
    //             if(i == 2) {
    //                 if(mes[i] == 0) {setButton3(false)}
    //                 else if(mes[i] == 1) {setButton3(true)}
    //             }
    //             if(i == 3) {
    //                 if(mes[i] == 0) {setButton4(false)}
    //                 else if(mes[i] == 1) {setButton(true)}
    //             }
    //         }
    //     }

    // }
    // )


    const [button1, setButton1] = useState(false);
    const [button2, setButton2] = useState(false);
    const [button3, setButton3] = useState(false);
    const [button4, setButton4] = useState(false);

    const handleButton1 = () => {
        setButton1(!button1)
        if (button1 == false) {
            mqttConnect.publish("topic1", "1");

        }
        else {
            mqttConnect.publish("topic1", "0");
        }
    }
    const handleButton2 = () => {
        setButton2(!button2)
        if (button2 == false) {
            mqttConnect.publish("topic2", "1");

        }
        else {
            mqttConnect.publish("topic2", "0");
        }
    }

    const handleButton3 = () => {
        setButton3(!button3)
        if (button3 == false) {
            mqttConnect.publish("topic3", "1");

        }
        else {
            mqttConnect.publish("topic3", "0");
        }
    }
    const handleButton4 = () => {
        setButton4(!button4)
        if (button4 == false) {
            mqttConnect.publish("topic4", "1");

        }
        else {
            mqttConnect.publish("topic4", "0");
        }
    }

    return (
        <div className="flex gap-2 flex flex-col justify-right pr-6">
 {/* room1 */}
            <div class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 justify-left flex flex-row space-y-4 gap-3">
               <div className="pt-2 pr-5"><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Room 1</h5> </div>
                
                {/* button 1*/}
                <div class = "justify-center flex flex-col space-y-4">
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox"
                        checked={button1}
                        onChange={handleButton1}
                        class="sr-only peer" />
                    <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Button 1 </span>
                </label>

                {/* button 2*/}

                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox"
                        checked={button2}
                        onChange={handleButton2}
                        class="sr-only peer" />
                    <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Button 2 </span>
                </label>

                {/* button 3*/}

                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox"
                        checked={button3}
                        onChange={handleButton3}
                        class="sr-only peer" />
                    <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Button 3 </span>
                </label>

                {/* button 4*/}

                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox"
                        checked={button4}
                        onChange={handleButton4}
                        class="sr-only peer" />
                    <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Button 4 </span>
                </label>
                </div>
                        <div className="justify-left flex flex-col space-y-5 pt-0.2 pl-20">
                        <span class="flex items-center ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"><span class="flex w-2.5 h-2.5 bg-green-500 rounded-full me-1.5 flex-shrink-0"></span>Status: Online</span>
                        <div class="jutify-left pl-3 flex flex-row"><TbAirConditioning className="h-6 w-6"/><span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Temperature: 25°C  </span></div>
                        <div class="jutify-left pl-3 flex flex-row"><MdEmojiPeople className="h-6 w-6"/><span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">People Detected: Yes  </span></div>
                        <div class="jutify-left pl-3 flex flex-row"><MdOutlineDeviceUnknown className="h-6 w-6"/><span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Electric Device: Light, Fan</span></div>
                </div>

                <div className="justify-left flex flex-col space-y-5 pt-0.2 pl-20">
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Check-in date: 14:22:42 12/1/2024</span>
                    <div class="jutify-left pl-3 flex flex-row"><GiPowerLightning className="h-6 w-6"/><span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Total Power usage: </span></div>
                    <button type="button" class="w-2/3 relative inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                    </svg>
                    <span class="sr-only">Notifications</span>
                    Messages
                    <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">8</div>
                    </button>
                    
                </div>

            </div>
{/* room2 */}
            <div class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 justify-left flex flex-row space-y-4 gap-3">
               <div className="pt-2 pr-5"><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Room 2</h5> </div>
                
                {/* button 1*/}
                <div class = "justify-center flex flex-col space-y-4">
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox"
                        checked={button1}
                        onChange={handleButton1}
                        class="sr-only peer" />
                    <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Button 1 </span>
                </label>

                {/* button 2*/}

                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox"
                        checked={button2}
                        onChange={handleButton2}
                        class="sr-only peer" />
                    <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Button 2 </span>
                </label>

                {/* button 3*/}

                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox"
                        checked={button3}
                        onChange={handleButton3}
                        class="sr-only peer" />
                    <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Button 3 </span>
                </label>

                {/* button 4*/}

                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox"
                        checked={button4}
                        onChange={handleButton4}
                        class="sr-only peer" />
                    <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Button 4 </span>
                </label>
                </div>
                        <div className="justify-left flex flex-col space-y-5 pt-0.2 pl-20">
                        <span class="flex items-center ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"><span class="flex w-2.5 h-2.5 bg-red-500 rounded-full me-1.5 flex-shrink-0"></span>Status: Offline</span>
                        {/* <div class="jutify-left pl-3 flex flex-row"><TbAirConditioning className="h-6 w-6"/><span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Temperature: 25°C  </span></div>
                        <div class="jutify-left pl-3 flex flex-row"><MdEmojiPeople className="h-6 w-6"/><span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">People Detected: Yes  </span></div>
                        <div class="jutify-left pl-3 flex flex-row"><MdOutlineDeviceUnknown className="h-6 w-6"/><span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Electric Device: Light, Fan</span></div> */}
                </div>

                {/* <div className="justify-left flex flex-col space-y-5 pt-0.2 pl-20">
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Check-in date: 14:22:42 12/1/2024</span>
                    <div class="jutify-left pl-3 flex flex-row"><GiPowerLightning className="h-6 w-6"/><span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Total Power usage: </span></div>
                    <button type="button" class="w-2/3 relative inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                    </svg>
                    <span class="sr-only">Notifications</span>
                    Messages
                    <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">8</div>
                    </button>
                    
                </div> */}


            </div>
{/* room3 */}
            <div class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 justify-left flex flex-row space-y-4 gap-3">
               <div className="pt-2 pr-5"><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Room 3</h5> </div>
                
                {/* button 1*/}
                <div class = "justify-center flex flex-col space-y-4">
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox"
                        checked={button1}
                        onChange={handleButton1}
                        class="sr-only peer" />
                    <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Button 1 </span>
                </label>

                {/* button 2*/}

                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox"
                        checked={button2}
                        onChange={handleButton2}
                        class="sr-only peer" />
                    <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Button 2 </span>
                </label>

                {/* button 3*/}

                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox"
                        checked={button3}
                        onChange={handleButton3}
                        class="sr-only peer" />
                    <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Button 3 </span>
                </label>

                {/* button 4*/}

                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox"
                        checked={button4}
                        onChange={handleButton4}
                        class="sr-only peer" />
                    <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Button 4 </span>
                </label>
                </div>
                        <div className="justify-left flex flex-col space-y-5 pt-0.2 pl-20">
                        <span class="flex items-center ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"><span class="flex w-2.5 h-2.5 bg-red-500 rounded-full me-1.5 flex-shrink-0"></span>Status: Offline</span>
                        {/* <div class="jutify-left pl-3 flex flex-row"><TbAirConditioning className="h-6 w-6"/><span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Temperature: 25°C  </span></div>
                        <div class="jutify-left pl-3 flex flex-row"><MdEmojiPeople className="h-6 w-6"/><span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">People Detected: Yes  </span></div>
                        <div class="jutify-left pl-3 flex flex-row"><MdOutlineDeviceUnknown className="h-6 w-6"/><span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Electric Device: Light, Fan</span></div> */}
                </div>

                {/* <div className="justify-left flex flex-col space-y-5 pt-0.2 pl-20">
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Check-in date: 14:22:42 12/1/2024</span>
                    <div class="jutify-left pl-3 flex flex-row"><GiPowerLightning className="h-6 w-6"/><span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Total Power usage: </span></div>
                    <button type="button" class="w-2/3 relative inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                    </svg>
                    <span class="sr-only">Notifications</span>
                    Messages
                    <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">8</div>
                    </button>
                    
                </div> */}


            </div>
{/* room4 */}
<div class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 justify-left flex flex-row space-y-4 gap-3">
               <div className="pt-2 pr-5"><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Room 4</h5> </div>
                
                {/* button 1*/}
                <div class = "justify-center flex flex-col space-y-4">
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox"
                        checked={button1}
                        onChange={handleButton1}
                        class="sr-only peer" />
                    <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Button 1 </span>
                </label>

                {/* button 2*/}

                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox"
                        checked={button2}
                        onChange={handleButton2}
                        class="sr-only peer" />
                    <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Button 2 </span>
                </label>

                {/* button 3*/}

                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox"
                        checked={button3}
                        onChange={handleButton3}
                        class="sr-only peer" />
                    <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Button 3 </span>
                </label>

                {/* button 4*/}

                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox"
                        checked={button4}
                        onChange={handleButton4}
                        class="sr-only peer" />
                    <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Button 4 </span>
                </label>
                </div>
                        <div className="justify-left flex flex-col space-y-5 pt-0.2 pl-20">
                        <span class="flex items-center ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"><span class="flex w-2.5 h-2.5 bg-red-500 rounded-full me-1.5 flex-shrink-0"></span>Status: Offline</span>
                        {/* <div class="jutify-left pl-3 flex flex-row"><TbAirConditioning className="h-6 w-6"/><span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Temperature: 25°C  </span></div>
                        <div class="jutify-left pl-3 flex flex-row"><MdEmojiPeople className="h-6 w-6"/><span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">People Detected: Yes  </span></div>
                        <div class="jutify-left pl-3 flex flex-row"><MdOutlineDeviceUnknown className="h-6 w-6"/><span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Electric Device: Light, Fan</span></div> */}
                </div>

                {/* <div className="justify-left flex flex-col space-y-5 pt-0.2 pl-20">
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Check-in date: 14:22:42 12/1/2024</span>
                    <div class="jutify-left pl-3 flex flex-row"><GiPowerLightning className="h-6 w-6"/><span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Total Power usage: </span></div>
                    <button type="button" class="w-2/3 relative inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                    </svg>
                    <span class="sr-only">Notifications</span>
                    Messages
                    <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">8</div>
                    </button>
                    
                </div> */}


            </div>
            
        </div>


    )

}
export default DeviceManager;