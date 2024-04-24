"use client";

import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useState,
} from "react";
import CreateScenarioModule from "./_component/CreateScenarioModule";
import { useAddScenario } from "@/api/scenarios/useAddScenario";
import useUserStore from "@/stores/useUserStore";
import { getScenarioImageGen } from "@/api/scenarios/scenarioApi";

export default function CreateScenarioPage() {
  const [title, setTitle] = useState<string>("");
  const [settings, setSettings] = useState("");
  const [aiSetting, setAiSetting] = useState("");
  const [mission, setMission] = useState("");
  const [startingMessage, setStartingMessage] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { createScenario, isPending } = useAddScenario();
  const { user } = useUserStore();

  const onGenClick: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      setIsLoading(true);
      const response = await getScenarioImageGen(settings, aiSetting);
      setImageUrl(response);
      setIsLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    createScenario({
      authorEmail: user?.email,
      title,
      settings,
      aiSetting,
      mission,
      startingMessage,
      imageUrl,
    });
  };

  const onChangeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const onChangeSettings: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setSettings(e.target.value);
  };

  const onChangeAiSetting: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setAiSetting(e.target.value);
  };

  const onChangeMission: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setMission(e.target.value);
  };

  const onChangeStartingMessage: ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    setStartingMessage(e.target.value);
  };

  return (
    <CreateScenarioModule
      title={title}
      settings={settings}
      aiSetting={aiSetting}
      mission={mission}
      startingMessage={startingMessage}
      imageUrl={imageUrl}
      onGenClick={onGenClick}
      isLoading={isLoading}
      error={error}
      isPending={isPending}
      onChangeTitle={onChangeTitle}
      onChangeSettings={onChangeSettings}
      onChangeAiSetting={onChangeAiSetting}
      onChangeMission={onChangeMission}
      onChangeStartingMessage={onChangeStartingMessage}
      onSubmit={onSubmit}
    />
  );
}
