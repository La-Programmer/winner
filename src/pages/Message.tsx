import { useNavigate } from "react-router";
import Card from "../components/Card";
import Button from "../components/Button";

interface MessagePageProps {
  message: {
    intro: string;
    body: string[];
    closing: string[];
  };
}

const MessagePage = ({ message }: MessagePageProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-6">
      <Card className="w-full max-w-md px-7 py-8">
        {/* Header */}
        <div className="text-center">
          <p className="font-script text-4xl text-pink-700">For You</p>
          <p className="mt-2 font-romantic text-sm text-gray-600 italic">
            A little note from my heart 💌
          </p>
        </div>

        <div className="my-6 h-px w-full bg-pink-200/80" />

        {/* Intro */}
        <p className="font-romantic text-lg text-gray-800 leading-relaxed">
          {message.intro}
        </p>

        {/* Body */}
        <div className="mt-6 space-y-3">
          {message.body.map((line, idx) => (
            <p
              key={idx}
              className="font-romantic text-base text-gray-700 leading-relaxed"
            >
              {line}
            </p>
          ))}
        </div>

        {/* Closing */}
        <div className="mt-7 rounded-2xl border border-pink-200 bg-pink-50/70 p-4">
          {message.closing.map((line, idx) => (
            <p
              key={idx}
              className="font-romantic text-base text-pink-800 leading-relaxed"
            >
              {line}
            </p>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <Button
            className="w-56 text-lg bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg"
            onClick={() => navigate("/slideshow")}
          >
            See Our Moments 💞
          </Button>

          <p className="font-romantic text-xs text-gray-500 italic">
            I saved a few memories just for you
          </p>
        </div>
      </Card>
    </div>
  );
};

export default MessagePage;
