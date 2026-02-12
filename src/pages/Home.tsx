import Button from "../components/Button";
import Card from "../components/Card";
import { useNavigate } from "react-router";
import ImpossibleNoButton from "../components/ImpossibleNoButton";

interface HomeProps {
  nickname: string;
}

const Home = ({ nickname }: HomeProps) => {
  const navigate = useNavigate();

  const imageUrl =
    "/dummy.jpg";

  return (
    <div className="flex flex-col items-center gap-6">
      
      {/* Profile Image */}
      <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-pink-300 shadow-lg">
        <img
          src={imageUrl}
          alt={nickname}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Request Card */}
      <Card className="flex flex-col items-center text-center gap-4">
        <h1 className="font-script text-3xl text-pink-700">
          My beautiful {nickname}
        </h1>

        <p className="font-romantic text-lg text-gray-700 italic">
          Will you be my Valentine?
        </p>

        <div className="mt-4 flex flex-col gap-3 w-full items-center">
          <Button
            className="w-40 text-lg"
            onClick={() => navigate("/message")}
          >
            Yes 💖
          </Button>

          <ImpossibleNoButton className="w-32" />
        </div>
      </Card>
    </div>
  );
};

export default Home;
