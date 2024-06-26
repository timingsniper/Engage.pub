import { CreateScenarioModuleProps } from "@/types/CreateScenarioProps";

interface CreateScenarioFormProps {
  imageUrl: string;
  isLoading: boolean;
  error: boolean;
  isPending: boolean;
  onGenClick: React.MouseEventHandler<HTMLButtonElement>;
  onChangeTitle: React.ChangeEventHandler<HTMLInputElement>;
  onChangeSettings: React.ChangeEventHandler<HTMLTextAreaElement>;
  onChangeAiSetting: React.ChangeEventHandler<HTMLTextAreaElement>;
  onChangeMission: React.ChangeEventHandler<HTMLTextAreaElement>;
  onChangeStartingMessage: React.ChangeEventHandler<HTMLTextAreaElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  editMode?: boolean;
}

export default function CreateScenarioModule({
  title,
  settings,
  aiSetting,
  mission,
  startingMessage,
  imageUrl,
  onGenClick,
  isLoading,
  error,
  isPending,
  onChangeTitle,
  onChangeSettings,
  onChangeAiSetting,
  onChangeMission,
  onChangeStartingMessage,
  onSubmit,
  editMode = false,
}: CreateScenarioModuleProps & CreateScenarioFormProps) {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          {editMode ? "Edit scenario" : "Create new scenario"}
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Please fill in the details for scenario throughly.
        </p>
        <form className="space-y-8" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              <strong>Scenario title</strong> (Ex: First day of school)
            </label>
            <input
              type="text"
              id="title"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              value={title}
              onChange={onChangeTitle}
              placeholder="Scenario title"
              required
            />
          </div>
          <div>
            <label
              htmlFor="settings"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              <strong>Scenario setting</strong> <br />
              (Describe the scenario. Ex: You are an exchange student who just
              arrived in the United States. Today is your first day in school.)
            </label>
            <textarea
              id="settings"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              value={settings}
              onChange={onChangeSettings}
              placeholder="Scenario Setting"
              required
            />
          </div>
          <div>
            <label
              htmlFor="aiSetting"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              <strong>Setting for AI</strong> <br />
              (AI will role-play as the setting you give here. Ex: You are Jack,
              a second-year student in New York University responsible for
              helping out the exchange students who just arrived at New York
              University.)
            </label>
            <textarea
              id="aiSetting"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              value={aiSetting}
              onChange={onChangeAiSetting}
              placeholder="Setting for AI"
              required
            />
          </div>
          <div>
            <label
              htmlFor="mission"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              <strong>Scenario Mission</strong> <br />
              (Conversation will end when the mission you give here is
              accomplished. Ex: Ask Jack where the dormitory is.)
            </label>
            <textarea
              id="mission"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              value={mission}
              onChange={onChangeMission}
              placeholder="Scenario Mission"
              required
            />
          </div>
          <div>
            <label
              htmlFor="startingMessage"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              <strong>Starting Message</strong> <br />
              (Conversation will start with the message you give here. Ex: Hi,
              I'm Jack! How may I help you?)
            </label>
            <textarea
              id="startingMessage"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              value={startingMessage}
              onChange={onChangeStartingMessage}
              placeholder="Setting for AI"
              required
            />
          </div>
          <div>
            <label
              htmlFor="imageGen"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              <strong>Scenario Image</strong> <br />
              (Based on the settings you give, an image will be generated for
              the scenario.)
            </label>
            <button type="button" className="btn btn-primary" onClick={onGenClick} disabled={isLoading}>
              {imageUrl ? "Regenerate Image" : "Generate Image"}
            </button>
            {isLoading && (
              <div className="flex h-screen justify-center justify-items-center">
                <span className="loading loading-spinner text-primary"></span>
              </div>
            )}
            {error && (<h2>An error has occured.</h2>)}
            {(!isLoading && imageUrl) && <img src={imageUrl} alt="Scenario Image" />}
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
