import mqtt from "mqtt";
import { useEffect, useState, useRef } from "react";
import { TbAirConditioning } from "react-icons/tb";
import { MdEmojiPeople } from "react-icons/md";
import { MdOutlineDeviceUnknown } from "react-icons/md";
import { FcAssistant } from "react-icons/fc";

import io from "socket.io-client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  host: "localhost",
  port: 1884,
  protocol: "mqtt",
  topic: ["result"],
  id: "ADMIN",
};
const mqttConnect = mqtt.connect(options);

const DeviceManager = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "No Abnormal Detected", createAt: " " }
  ]);
  function ChatMessage(props) {
    const { text, createAt } = props.messages;
    const bottomRef = useRef(null);
    setTimeout(
      () => bottomRef.current.scrollIntoView({ behavior: "smooth" }),
      1000
    );

    return (<>
      <div className="mt-6" ref={bottomRef}>
        <div className="flex flex-col sm:flex-row items-center">
          <div className="flex justify-start w-full mx-auto items-center">
            <div className="w-full sm:w-1/2 sm:pr-8">
              <div className="p-4 bg-white rounded shadow bg-blue-500">
                <div className="w-full"> <FcAssistant size={30}/></div>
                
                {text === "Abnormal Detected" ? (<p className="text-red-500">{text}, {abnormalChoice}</p>) : (<p>{text}</p>)}
                <p className="text-slate-500">{createAt}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }

  useEffect(() => {
    mqttConnect.publish("topic6", "S");
    getDateLabels();
    const newSocket = io("http://localhost:5000"); // Adjust URL as needed
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server!");
    });

    newSocket.on("alert", (message) => {
      console.log("Message received:", message);
      const newMessage = {
        id: messages.length + 1,
        text: message,
        createAt: new Date().toLocaleString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      if(message == "Abnormal Detected") {setAbnormalChoice(true)}
      setMessages(messages => [...messages, newMessage]);
    });
    newSocket.on("device", (message) => {
      console.log("Message device:", message);
      setDevice(message);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    return () => newSocket.close();
  }, []);
  // setInterval(mqttUpdate , 100)

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
  const [dates, setDates] = useState([]);
  const [dataset, setDataSet] = useState([]);
  const [abnormalChoice, setAbnormalChoice] = useState(false)
  const [socket, setSocket] = useState(null);
  const [device, setDevice] = useState("");
  const [time, setTime] = useState("");

  const getDateLabels = () => {
    var resp = axios({
      method: "get",
      url: "http://localhost:5000/power/kwh-array",
    }).then((resp) => {
      setDates(resp.data.map((entry) => entry.date));
      setDataSet(resp.data.map((entry) => parseFloat(entry.highest_kwh)));
    });
  };
  const handleButton1 = () => {
    setButton1(!button1);
    if (button1 == false) {
      mqttConnect.publish("topic1", "ON");
    } else {
      mqttConnect.publish("topic1", "OFF");
    }
  };
  const handleButton2 = () => {
    setButton2(!button2);
    if (button2 == false) {
      mqttConnect.publish("topic2", "ON");
    } else {
      mqttConnect.publish("topic2", "OFF");
    }
  };

  const handleButton3 = () => {
    setButton3(!button3);
    if (button3 == false) {
      mqttConnect.publish("topic3", "ON");
    } else {
      mqttConnect.publish("topic3", "OFF");
    }
  };
  const handleButton4 = () => {
    setButton4(!button4);
    if (button4 == false) {
      mqttConnect.publish("topic4", "ON");
    } else {
      mqttConnect.publish("topic4", "OFF");
    }
  };

  return (
    <div>
      <div className="flex gap-2 flex flex-col justify-right pr-6">
        {/* room1 */}
        <div class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 justify-left flex flex-row space-y-4 gap-3">
          <div className="pt-2 pr-5">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"></h5>{" "}
          </div>

          {/* button 1*/}
          <div class="justify-center flex flex-col space-y-4">
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={button1}
                onChange={handleButton1}
                class="sr-only peer"
              />
              <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Button 1{" "}
              </span>
            </label>

            {/* button 2*/}

            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={button2}
                onChange={handleButton2}
                class="sr-only peer"
              />
              <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Button 2{" "}
              </span>
            </label>

            {/* button 3*/}

            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={button3}
                onChange={handleButton3}
                class="sr-only peer"
              />
              <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Button 3{" "}
              </span>
            </label>

            {/* button 4*/}

            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={button4}
                onChange={handleButton4}
                class="sr-only peer"
              />
              <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Button 4{" "}
              </span>
            </label>
          </div>
          <div className="justify-left flex flex-col space-y-5 pt-0.2 pl-20">
            <span class="flex items-center ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              <span class="flex w-2.5 h-2.5 bg-green-500 rounded-full me-1.5 flex-shrink-0"></span>
              Status: Online
            </span>
            <div class="jutify-left pl-3 flex flex-row">
              <TbAirConditioning className="h-6 w-6" />
              <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Temperature: 25°C{" "}
              </span>
            </div>
            <div class="jutify-left pl-3 flex flex-row">
              <MdEmojiPeople className="h-6 w-6" />
              <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                People Detected: Yes{" "}
              </span>
            </div>
            <div class="jutify-left pl-3 flex flex-row">
              <MdOutlineDeviceUnknown className="h-6 w-6" />
              <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Electric Device: {device}
              </span>
            </div>
          </div>

          <div className="justify-left flex flex-col space-y-5 pt-0.2 pl-20">
            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Check-in date: 14:22:42 12/1/2024
            </span>

            <button
              type="button"
              class="w-2/3 relative inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                class="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
              <span class="sr-only">Notifications</span>
              Messages
              <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                8
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mr-6">
        <div className="pt-2 pr-5">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Power Consumption
          </h5>{" "}
        </div>
        <div className="flex pt-10 max-h-96 pl-72 bg-white">
          <Bar
            data={{
              labels: dates,
              datasets: [
                {
                  label: "Power Consumption (KWh)",
                  backgroundColor: [
                    "#3e95cd",
                    "#8e5ea2",
                    "#3cba9f",
                    "#e8c3b9",
                    "#c45850",
                  ],
                  data: dataset,
                },
              ],
            }}
            options={{
              legend: { display: false },
              title: {
                display: true,
                text: "Predicted world population (millions) in 2050",
              },
            }}
          />
        </div>

        <div className="justify-center flex flex-col pl-6 pt-10">
          <span class="ms-3 text-2xl font-medium text-gray-900 dark:text-gray-300">
            Power usage warning:
          </span>
          <div className="py-6 flex flex-col justify-center mt-5 w-3/4">
            <div className="py-3 w-3/4 px-2 sm:px-0 overflow-auto h-72 bg-blue-200 rounded-lg">
              <div className="relative text-gray-700 antialiased text-sm font-semibold pl-10">
                {messages &&
                  messages.map((msg) => <ChatMessage key={msg.id} messages={msg} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeviceManager;
