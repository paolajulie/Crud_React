import { EditIcon, DeleteIcon } from "@chakra-ui/icons"

import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
  useBreakpointValue,
} from "@chakra-ui/react"

import { useEffect, useState } from "react"
import { Modal } from "@chakra-ui/react";
import ModalComp from "./components/ModalComp";


const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [data, setData] = useState([])
  const [dataEdit, setDataEdit] = useState({})

  //hook do chakra ui pra ver se é mobile ou não
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  })

  useEffect(() => {
    const db_costumer = localStorage.getItem("cad_cliente")
      ? JSON.parse(localStorage.getItem("cad_cliente"))
      : []

    setData(db_costumer)
  }, [setData])

  const handleRemove = (email) => {
    const newArray = data.filter((item) => item.email !== email)

    setData(newArray)

    localStorage.setItem("cad_cliente", JSON.stringify(newArray))
  }

  const handleEdit = (name, email, index) => {
    setDataEdit({ name, email, index });
    onOpen();
  }


  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily=" Century Gothic"
      bg="#f8eec4"
    >
      <Box maxW={800} w="100%" h="100vh" py={10} px={2}>
        <Button bg="#f2b2b2" onClick={() => [setDataEdit({}), onOpen()]}>
          NOVO CADASTRO
        </Button>

        <Box overflowY="auto" height="100%">
          <Table mt="6">
            <Thead >
              <Tr>
                <Th borderColor="#be8282" color="#be8282" maxW={isMobile ? 5 : 100} fontSize="20px">
                  Nome
                </Th>
                <Th borderColor="#be8282" color="#be8282" maxW={isMobile ? 5 : 100} fontSize="20px">
                  E-mail
                </Th>
                <Th borderColor="#be8282" p={0}></Th>
                <Th borderColor="#be8282" p={0}></Th>
              </Tr>
            </Thead>
            <Tbody  >
              {data.map(({ name, email }, index) => (
                <Tr key={index} cursor="pointer" _hover={{ bg: "gray.100" }}>
                  < Td maxW={isMobile ? 5 : 100}>{name}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{email}</Td>
                  <Td p={0}>
                    <EditIcon
                      fontSize={20}
                      onClick={() => handleEdit(name, email, index)}

                    />
                  </Td>
                  <Td p={0}>
                    <DeleteIcon
                      fontSize={20}
                      onClick={() => handleRemove(email)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <ModalComp
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}

    </Flex>

  )
}

export default App
