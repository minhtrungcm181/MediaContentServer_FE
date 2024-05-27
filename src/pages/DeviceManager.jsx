import mqtt from "mqtt";
import { useEffect, useState, useRef } from "react";
import { TbAirConditioning } from "react-icons/tb";
import { MdEmojiPeople } from "react-icons/md";
import { MdOutlineDeviceUnknown } from "react-icons/md";
import { FcAssistant } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import io from "socket.io-client";
import { AiFillAlert } from "react-icons/ai";
import { MdInsertChart } from "react-icons/md";
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
    { id: 1, text: "No Abnormal Detected", createAt: " " },
  ]);
  function ChatMessage(props) {
    const { text, createAt } = props.messages;
    const bottomRef = useRef(null);
    setTimeout(
      () => bottomRef.current.scrollIntoView({ behavior: "smooth" }),
      1000
    );

    return (
      <>
        <div className="mt-6" ref={bottomRef}>
          <div className="flex flex-col sm:flex-row items-center">
            <div className="flex justify-start w-full mx-auto items-center">
              <div className="w-full sm:w-1/2 sm:pr-8">
                <div className="p-4 bg-white rounded shadow bg-blue-500">
                  <div className="w-full">
                    {" "}
                    <FcAssistant size={30} />
                  </div>

                  {text === "Abnormal Detected" ? (
                    <p className="text-red-500">
                      {text}, {abnormalChoice}
                    </p>
                  ) : (
                    <p>{text}</p>
                  )}
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
      if (message == "Abnormal Detected") {
        setAbnormalChoice(true);
      }
      setMessages((messages) => [...messages, newMessage]);
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
  const [abnormalChoice, setAbnormalChoice] = useState(false);
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
        <div class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700 justify-left flex flex-row space-y-4 gap-3">
          <div className="pt-2 pr-5">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"></h5>{" "}
          </div>

          <div class="flex flex-row justify-center items-center space-x-32">
            {/* button 1*/}

            <div className="flex flex-col items-center justify-center space-y-6">
              <div
                className={`w-24 rounded-full ${
                  button1 ? "bg-white" : "bg-black"
                }`}
              >
                <label class="swap swap-rotate pl-1 pt-1">
                  <input type="checkbox" checked={button1} />

                  <svg
                    class="swap-on fill-current w-10 h-10"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>

                  <svg
                    class="swap-off fill-current w-10 h-10"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>
              </div>
              <button class="btn btn-xl" onClick={handleButton1}>
                Device 1: {button1 ? " ON" : " OFF"}
              </button>
            </div>

            {/* button 2*/}
            <div className="flex flex-col items-center justify-center space-y-6">
              <div
                className={`w-24 rounded-full ${
                  button2 ? "bg-white" : "bg-black"
                }`}
              >
                <label class="swap swap-rotate pl-1 pt-1">
                  <input type="checkbox" checked={button2} />

                  <svg
                    class="swap-on fill-current w-10 h-10"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>

                  <svg
                    class="swap-off fill-current w-10 h-10"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>
              </div>
              <button class="btn btn-xl" onClick={handleButton2}>
                Device 2: {button2 ? " ON" : " OFF"}
              </button>
            </div>

            {/* button 3*/}
            <div className="flex flex-col items-center justify-center space-y-6">
              <div
                className={`w-24 rounded-full ${
                  button3 ? "bg-white" : "bg-black"
                }`}
              >
                <label class="swap swap-rotate pl-1 pt-1">
                  <input type="checkbox" checked={button3} />

                  <svg
                    class="swap-on fill-current w-10 h-10"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>

                  <svg
                    class="swap-off fill-current w-10 h-10"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>
              </div>
              <button class="btn btn-xl" onClick={handleButton3}>
                Device 3: {button3 ? " ON" : " OFF"}
              </button>
            </div>

            {/* button 4*/}
            <div className="flex flex-col items-center justify-center space-y-6">
              <div
                className={`w-24 rounded-full ${
                  button4 ? "bg-white" : "bg-black"
                }`}
              >
                <label class="swap swap-rotate pl-1 pt-1">
                  <input type="checkbox" checked={button4} />

                  <svg
                    class="swap-on fill-current w-10 h-10"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>

                  <svg
                    class="swap-off fill-current w-10 h-10"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>
              </div>
              <button class="btn btn-xl" onClick={handleButton4}>
                Device 4: {button4 ? " ON" : " OFF"}
              </button>
            </div>
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
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 pr-5">
      <div className="flex flex-col p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700 mr-6 mt-10">
      <FaEye size={30}/>
        <a class="text-2xl normal-case pt-5">Device Working:</a>
        <a class="text-xl normal-case pt-5 pb-5">{device}</a>
      </div>
      <div className="flex flex-col p-6 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700 mr-6 mt-10">
      <div className="justify-center flex flex-col">
      <AiFillAlert size={30}/>
      <a class="text-2xl normal-case pt-5">Power usage warning:</a>
          <div className="py-6 flex flex-col justify-center w-full">
            <div className="py-3 w-full px-2 sm:px-0 overflow-auto h-36 bg-gray-800 rounded-lg">
              <div className="relative text-gray-700 antialiased text-sm font-semibold pl-10">
                {messages &&
                  messages.map((msg) => (
                    <ChatMessage key={msg.id} messages={msg} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      <div className="flex flex-col p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700 mr-6 mt-10">
      <MdInsertChart size={30}/>
        <div className="pb-5 pt-5">
       
          <a class="text-2xl normal-case">Power Consumption:</a>
        </div>
        <div className="flex pt-10 max-h-96 pl-72 bg-gray-700">
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

        
      </div>
    </div>
  );
};
export default DeviceManager;
