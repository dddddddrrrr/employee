import CenterPageContent from "~/components/center/CenterPageContent";
import { getUserInfoById } from "~/app/actions";

const CenterPage = async ({ params }: { params: { id: string } }) => {
  const userInfo = await getUserInfoById(params.id);

  return <CenterPageContent userInfo={userInfo} />;
};

export default CenterPage;
