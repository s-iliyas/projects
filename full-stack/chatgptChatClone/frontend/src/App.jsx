import { Button, Input, Select, message, Spin, Drawer } from "antd";
import { useEffect, useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import {
  LoadingOutlined,
  RobotOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";

function App() {
  const { TextArea } = Input;

  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const [depthValue, setDepthValue] = useState("Level_1");
  const [learningValue, setLearningValue] = useState("Cognitive");
  const [toneValue, setToneValue] = useState("Debate");
  const [commValue, setCommValue] = useState("Stochastic");
  const [frameworkValue, setFrameworkValue] = useState("Deductive");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [messageApi, contextHolder] = message.useMessage();

  const depthValues = [
    {
      value: "Level_1",
      label: "Surface level",
    },
    {
      value: "Level_2",
      label: "Expanded understanding",
    },
    {
      value: "Level_3",
      label: "Detailed analysis",
    },
    {
      value: "Level_4",
      label: "Practical application",
    },
    {
      value: "Level_5",
      label: "Advanced concepts",
    },
    {
      value: "Level_6",
      label: "Critical evaluation",
    },
    {
      value: "Level_7",
      label: "Synthesis and integration",
    },
    {
      value: "Level_8",
      label: "Expert insight",
    },
    {
      value: "Level_9",
      label: "Specialization",
    },
    {
      value: "Level_10",
      label: "Cutting-edge research",
    },
  ];

  const learningValues = [
    {
      value: "Cognitive",
      label: "Cognitive",
    },
    {
      value: "Emotional",
      label: "Emotional",
    },
    {
      value: "Compassionate",
      label: "Compassionate",
    },
    {
      value: "Somatic",
      label: "Somatic",
    },
    {
      value: "Spiritual",
      label: "Spiritual",
    },
  ];

  const commValues = [
    {
      value: "Stochastic",
      label: "Stochastic",
    },
    {
      value: "Formal",
      label: "Formal",
    },
    {
      value: "Textbook",
      label: "Textbook",
    },
    {
      value: "Layman",
      label: "Layman",
    },
    {
      value: "Story Telling",
      label: "Story Telling",
    },
    {
      value: "Socratic",
      label: "Socratic",
    },
    {
      value: "Humorous",
      label: "Humorous",
    },
  ];

  const toneValues = [
    {
      value: "Debate",
      label: "Debate",
    },
    {
      value: "Encouraging",
      label: "Encouraging",
    },
    {
      value: "Neutral",
      label: "Neutral",
    },
    {
      value: "Informative",
      label: "Informative",
    },
    {
      value: "Friendly",
      label: "Friendly",
    },
  ];

  const frameworkValues = [
    {
      value: "Deductive",
      label: "Deductive",
    },
    {
      value: "Inductive",
      label: "Inductive",
    },
    {
      value: "Abductive",
      label: "Abductive",
    },
    {
      value: "Analogical",
      label: "Analogical",
    },
    {
      value: "Casual",
      label: "Casual",
    },
  ];

  const error = (msg) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  const success = (msg) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
        color: "white",
      }}
      spin
    />
  );

  const handleDepthChange = (value) => {
    setDepthValue(value);
    setShow(true);
  };

  const handleLearningChange = (value) => {
    setLearningValue(value);
    setShow(true);
  };

  const handleToneChange = (value) => {
    setToneValue(value);
    setShow(true);
  };

  const handleCommChange = (value) => {
    setCommValue(value);
    setShow(true);
  };

  const handleFrameworkChange = (value) => {
    setFrameworkValue(value);
    setShow(true);
  };

  const handleTextChange = (e) => {
    setInput(e.target.value);
  };

  const getTextResponse = async (e) => {
    e.preventDefault();
    if (input) {
      await axios
        .post(
          "http://3.227.32.111:8000/agent/query",
          {
            query_string: input,
          },
          {
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((resp) => {
          const obj = { q: input, a: resp.data.response };
          setList((p) => [...p, obj]);
          setInput("");
          scrollToNewMessage();
        })
        .catch((err) => {
          error(err.message);
        });
    } else {
      error("Input cannot be empty.");
    }
  };

  const scrollToNewMessage = () => {
    const chatContainer = chatContainerRef?.current;
    const newMessage = chatContainer?.lastElementChild;
    const previousMessage = newMessage?.previousElementSibling;
    if (previousMessage) {
      previousMessage?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      newMessage?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getSelectResponse = async (e) => {
    e.preventDefault();
    setLoading(true);
    const query_data = `scenario depth:${depthValue},learning_style:${learningValue},communication_style:${commValue},tone_style:${toneValue},reasoning_framework:${frameworkValue}`;
    console.log(query_data);
    const data = {
      query_string: query_data,
    };
    await axios
      .post("http://3.227.32.111:8000/agent/config", data, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setShow(false);
        success("Preferences Changed.");
      })
      .catch((err) => {
        error(err.message);
      });
    setLoading(false);
  };

  const chatContainerRef = useRef(null);

  useEffect(() => {
    scrollToNewMessage();
  }, [list]);

  const dropDowns = () => (
    <div className="flex flex-col items-center justify-center space-y-3 mt-4">
      <div className="text-center text-3xl">Zelhus AI</div>
      <small className="font-serif m-2">
        Please select from dropdowns to change preferences.
      </small>
      <div className="flex flex-col space-y-2">
        <small className="font-serif">Depth Levels:</small>
        <Select
          defaultValue={depthValue}
          style={{
            width: 200,
          }}
          onChange={handleDepthChange}
          options={depthValues}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <small className=" font-serif">Learning Styles:</small>
        <Select
          defaultValue={learningValue}
          style={{
            width: 200,
          }}
          onChange={handleLearningChange}
          options={learningValues}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <small className="font-serif">Communication Styles:</small>
        <Select
          defaultValue={commValue}
          style={{
            width: 200,
          }}
          onChange={handleCommChange}
          options={commValues}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <small className="font-serif">Tone Styles:</small>
        <Select
          defaultValue={toneValue}
          style={{
            width: 200,
          }}
          onChange={handleToneChange}
          options={toneValues}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <small className="font-serif">Reasoning Frameworks:</small>
        <Select
          defaultValue={frameworkValue}
          style={{
            width: 200,
          }}
          onChange={handleFrameworkChange}
          options={frameworkValues}
        />
      </div>
      {show && (
        <Button
          type="primary"
          className="bg-sky-600 font-sans"
          onClick={getSelectResponse}
        >
          {loading ? <Spin indicator={antIcon} /> : "Submit"}
        </Button>
      )}
    </div>
  );

  const chatbox = () => (
    <div className="h-screen">
      <div className="md:mt-0 mt-10 flex flex-col space-y-3 h-[calc(100vh-5em)] md:h-[calc(100vh-3em)] overflow-auto p-1  mx-auto">
        {list &&
          list?.map((item, index) => (
            <div
              key={index}
              ref={chatContainerRef}
              className="bg-white rounded-lg p-2"
            >
              <div className="flex flex-col space-y-3 ">
                <div className="flex items-baseline space-x-1 mt-2">
                  <UserOutlined className="text-black" /> :
                  <p className="text-sm font-serif overflow-auto">{item.q}</p>
                </div>
                <div className="flex items-baseline space-x-1">
                  <RobotOutlined className="text-green-700" /> :
                  <p className="text-sm font-serif overflow-auto">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="bottom-0 md:w-[calc(100%-15em)] bg-white flex flex-row w-full fixed">
        <div className="flex flex-row md:w-[80%] md:mx-auto w-full ring-stone-200 ring bg-white m-2 items-center rounded-md">
          <TextArea
            autoSize={{ maxRows: 6 }}
            className="overflow-x-auto focus:ring-transparent focus:shadow-transparent outline-none focus:ring-0 border-none w-full "
            placeholder="Ask something...."
            onChange={handleTextChange}
            value={input}
          />
          <Link
            onClick={getTextResponse}
            className="text-black p-2 hover:text-orange-600 hover:rounded-xl hover:bg-transparent"
          >
            <AiOutlineSend />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <section className="h-screen ">
      {contextHolder}
      <div className="flex flex-row">
        <Link
          className="bg-orange-600 w-auto fixed left-0 m-[0.20rem] md:hidden block rounded-md"
          onClick={showDrawer}
        >
          <MenuOutlined className="text-black p-2" />
        </Link>
        <Drawer placement="left" onClose={onClose} open={open} width={300}>
          {dropDowns()}
        </Drawer>
        <div className="w-[15em] h-screen md:block md:p-5 hidden">
          {dropDowns()}
        </div>
        <div className="w-full bg-gray-200 overflow-hidden">{chatbox()}</div>
      </div>
    </section>
  );
}

export default App;
