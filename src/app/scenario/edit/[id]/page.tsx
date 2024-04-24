"use client";

import { getScenarioImageGen } from "@/api/scenarios/scenarioApi";
import { useEditScenario } from "@/api/scenarios/useEditScenario";
import useSingleScenario from "@/api/scenarios/useSingleScenario";
import CreateScenarioModule from "@/app/create/_component/CreateScenarioModule";
import useUserStore from "@/stores/useUserStore";
import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";

type Props = {
  params: { id: number };
};

export default function EditScenarioPage({ params }: Props) {
  const scenarioId = params.id;
  const {
    isLoading: isFetching,
    scenario,
    error: fetchError,
  } = useSingleScenario(scenarioId);
  const [title, setTitle] = useState<string>("");
  const [settings, setSettings] = useState("");
  const [aiSetting, setAiSetting] = useState("");
  const [mission, setMission] = useState("");
  const [startingMessage, setStartingMessage] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { modifyScenario, isPending } = useEditScenario(scenarioId);

  useEffect(() => {
    if (scenario) {
      setTitle(scenario.title);
      setSettings(scenario.settings);
      setAiSetting(scenario.aiSetting);
      setMission(scenario.mission);
      setStartingMessage(scenario.startingMessage);
      setImageUrl(scenario.imgSource);
    }
  }, [scenario]);

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
    modifyScenario({
      scenarioId,
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

  if (isFetching) {
    return (
      <div className="flex h-screen justify-center justify-items-center">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

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
      editMode={true}
    />
  );
}
