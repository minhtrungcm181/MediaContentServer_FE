import mqtt from "mqtt";
import { useEffect, useState } from "react";

const options = {
    host: 'localhost',
    port: 1884,
    protocol: 'mqtt',
    id: 'id_' + parseInt(Math.random() * 100000)
}
const mqttConnect = mqtt.connect(options);

const DeviceManager = () => {
    
    mqttConnect
    
    const [button1, setButton1] = useState(false);
    const [button2, setButton2] = useState(false);
    const [button3, setButton3] = useState(false);
    const [button4, setButton4] = useState(false);

    const handleButton1 = () =>{
        setButton1(!button1)
        if(button1 == false){
            mqttConnect.publish("topic1", "ON");
        
        }
        else {
            mqttConnect.publish("topic1", "OFF");
        }
    }
    const handleButton2 = () => {
        setButton2(!button2)
        if (button2 == false) {
            mqttConnect.publish("topic2", "ON");

        }
        else {
            mqttConnect.publish("topic2", "OFF");
        }
    }

    const handleButton3 = () => {
        setButton3(!button3)
        if (button3 == false) {
            mqttConnect.publish("topic3", "ON");

        }
        else {
            mqttConnect.publish("topic3", "OFF");
        }
    }
    const handleButton4 = () => {
        setButton4(!button4)
        if (button4 == false) {
            mqttConnect.publish("topic4", "ON");

        }
        else {
            mqttConnect.publish("topic4", "OFF");
        }
    }

    return(
        <div className="flex gap-2 flex-wrap justify-right">
            <div class="w-60 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 justify-center flex flex-col space-y-4">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Room 1</h5>

                {/* button 1*/}

                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" 
                    checked={button1}
                    onChange={handleButton1}
                    class="sr-only peer"/>
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
        </div>
    )
    
}
export default DeviceManager;