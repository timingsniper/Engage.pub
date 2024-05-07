export default function RubricCollapse() {
  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow border border-base-300 bg-base-200 mt-6"
    >
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">
        How is my level evaluated?
      </div>
      <div className="collapse-content">
        <h2 className="text-lg font-bold">Level 1: Beginner</h2>
        <ul>
          <li>
            <strong>Vocabulary:</strong> Limited to basic personal and family
            information, shopping, local geography, employment.
          </li>
          <li>
            <strong>Grammar:</strong> Can use simple tenses (present simple,
            past simple) but often makes mistakes.
          </li>
          <li>
            <strong>Communication:</strong> Can participate in simple
            conversations on familiar topics but struggles to form complex
            sentences or follow native speakers in natural discourse.
          </li>
          <li>
            <strong>Listening/Reading:</strong> Understands very basic spoken
            and written texts but often needs repetitions or translations.
          </li>
          <li>
            <strong>Writing:</strong> Can write simple sentences, fill out forms
            with personal details, and construct brief and direct messages.
          </li>
        </ul>
        <br />
        <h2 className="text-lg font-bold">Level 2: Intermediate</h2>
        <ul>
          <li>
            <strong>Vocabulary:</strong> Good command over broader range of
            everyday topics such as school, leisure etc. Can handle less common
            vocabulary with some hesitation.
          </li>
          <li>
            <strong>Grammar:</strong> Comfortable using a variety of tenses
            (present, past, and future), and starting to use compound sentences
            with more confidence.
          </li>
          <li>
            <strong>Communication:</strong> Can handle travel situations in
            English-speaking countries, describe experiences and events, and
            briefly explain plans and opinions.
          </li>
          <li>
            <strong>Listening/Reading:</strong> Can understand the main points
            of clear standard speech on familiar matters regularly encountered
            in work, school, leisure, etc. Can understand the main points of
            many radio or TV programs on current affairs or topics of personal
            interest when the delivery is relatively slow and clear.
          </li>
          <li>
            <strong>Writing:</strong> Can write straightforward connected texts
            on familiar subjects and personal interests. Capable of personal
            letters describing experiences and impressions.
          </li>
        </ul>
        <br />
        <h2 className="text-lg font-bold">Level 3: Advanced</h2>
        <ul>
          <li>
            <strong>Vocabulary:</strong> Rich vocabulary, including idiomatic
            expressions and colloquialisms. Can vary formulation to avoid
            frequent repetition, but lexical gaps can still occur without
            hindrance to communication.
          </li>
          <li>
            <strong>Grammar:</strong> Shows good control of grammar and can use
            complex sentence structures. Occasionally makes mistakes when using
            complex structures but is generally correct.
          </li>
          <li>
            <strong>Communication:</strong> Can use language flexibly and
            effectively for social, academic, and professional purposes. Can
            interact with a degree of fluency and spontaneity that makes regular
            interaction with native speakers quite possible without strain for
            either party.
          </li>
          <li>
            <strong>Listening/Reading:</strong> Can understand extended speech
            and lectures and follow even complex lines of argument provided the
            topic is reasonably familiar. Can understand most TV news and
            current affairs programs, as well as the majority of films in
            standard dialect.
          </li>
          <li>
            <strong>Writing:</strong> Can produce clear, well-structured,
            detailed text on complex subjects, showing controlled use of
            organizational patterns, connectors, and cohesive devices.
          </li>
        </ul>
      </div>
    </div>
  );
}
