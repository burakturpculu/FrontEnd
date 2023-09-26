import { Flex } from '@chakra-ui/layout';
import EditUser from '../dashboard/components/EditUser';

export default function PageIdIndex() {
  return (
    <Flex direction="column" flex="1 1 auto">
      <EditUser id={''} />
    </Flex>
  );
}
