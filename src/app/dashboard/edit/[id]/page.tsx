import { Flex } from '@chakra-ui/layout';
import EditTask from '../../components/EditTask';

export default function PageIdIndex({ params }: { params: { id: string } }) {
  return (
    <Flex direction="column" flex="1 1 auto">
      <EditTask id={params.id} />
    </Flex>
  );
}
