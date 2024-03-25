import { useState, useEffect } from "react";
import { CustomVideoPlayer } from "@components";
import { Flex } from "@components/ui";
import { getVideoSourcesApi } from "@api/videos";
import CustomDataForm from "@components/CustomDataForm";

const Home = () => {
  const [data, setData] = useState<Array<string>>([]);

  useEffect(() => {
    (async () => {
      const data = await getVideoSourcesApi();

      setData(data);
    })();
  }, []);

  return (
    <Flex $direction="column">
      <CustomVideoPlayer data={data} />
      <CustomDataForm />
    </Flex>
  );
};

export default Home;
