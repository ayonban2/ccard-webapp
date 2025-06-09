import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
  Progress,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import theme from "./theme";

function App() {
  const [form, setForm] = useState({
    pan: "",
    aadhaar: "",
    gender: "",
    occupation: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [limit, setLimit] = useState(0);
  const toast = useToast();

  const handleChange = (e) => {
    setForm(f => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const userResp = await fetch("/api/user-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!userResp.ok) throw new Error("User not found");
      const userData = await userResp.json();

      const mlResp = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const mlData = await mlResp.json();
      setResult({ userData, mlData });
      setLimit(mlData.limit_suggestions.optimal || 0);
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bgGradient="linear(to-br, #222 70%, #4b3700 100%)" py={12}>
        <Box maxW="md" mx="auto" bg="#232323" rounded="xl" boxShadow="2xl" p={8}>
          <VStack spacing={6}>
            <Heading size="lg" color="goldenrod" mb={2}>
              Credit Card Approval AI
            </Heading>
            <form style={{ width: "100%" }} onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel color="gray.200">PAN Number</FormLabel>
                  <Input name="pan" value={form.pan} onChange={handleChange} bg="#181818" color="gold" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel color="gray.200">Aadhaar Number</FormLabel>
                  <Input name="aadhaar" value={form.aadhaar} onChange={handleChange} bg="#181818" color="gold" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel color="gray.200">Gender</FormLabel>
                  <Select name="gender" value={form.gender} onChange={handleChange} bg="#181818" color="gold">
                    <option value="">Select</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel color="gray.200">Occupation</FormLabel>
                  <Select name="occupation" value={form.occupation} onChange={handleChange} bg="#181818" color="gold">
                    <option value="">Select</option>
                    <option value="Business">Business</option>
                    <option value="Salaried">Salaried</option>
                    <option value="Self-Employed">Self-Employed</option>
                  </Select>
                </FormControl>
                <Button
                  w="full"
                  colorScheme="yellow"
                  color="black"
                  type="submit"
                  isLoading={loading}
                  loadingText="Processing"
                  fontWeight="bold"
                  bgGradient="linear(to-r, gold, orange.400)"
                  _hover={{ bg: "gold" }}
                >
                  Check Approval
                </Button>
              </VStack>
            </form>
            {loading && <Progress size="xs" isIndeterminate colorScheme="yellow" width="100%" />}
            {result && (
              <Box w="full" mt={6} textAlign="center">
                <Flex align="center" justify="center" mb={2}>
                  {result.mlData.approved ? (
                    <Icon as={CheckCircleIcon} w={12} h={12} color="goldenrod" />
                  ) : (
                    <Icon as={WarningIcon} w={12} h={12} color="red.400" />
                  )}
                  <Heading ml={3} color={result.mlData.approved ? "goldenrod" : "red.400"}>
                    {result.mlData.approved ? "Approved!" : "Not Approved"}
                  </Heading>
                </Flex>
                <Text fontSize="lg" color="gray.200" mb={2}>
                  Approval Probability: <b>{(result.mlData.approval_probability * 100).toFixed(1)}%</b>
                </Text>
                <Text color="gray.400" mb={2}>
                  Credit Limit Suggestion:{" "}
                  <b style={{ color: "gold" }}>₹{result.mlData.credit_limit || 0}</b>
                </Text>
                {result.mlData.limit_suggestions && (
                  <Box>
                    <Text color="goldenrod">Choose Your Limit:</Text>
                    <Slider
                      min={result.mlData.limit_suggestions.safe}
                      max={result.mlData.limit_suggestions.stretched}
                      value={limit}
                      onChange={setLimit}
                      step={1000}
                      colorScheme="yellow"
                    >
                      <SliderTrack bg="#555">
                        <SliderFilledTrack bg="goldenrod" />
                      </SliderTrack>
                      <SliderThumb boxSize={6} bg="gold" />
                    </Slider>
                    <Flex justify="space-between" mt={1}>
                      <Text fontSize="sm" color="gray.400">
                        Safe: ₹{result.mlData.limit_suggestions.safe}
                      </Text>
                      <Text fontSize="sm" color="gray.200">
                        Optimal: ₹{result.mlData.limit_suggestions.optimal}
                      </Text>
                      <Text fontSize="sm" color="gray.400">
                        Stretched: ₹{result.mlData.limit_suggestions.stretched}
                      </Text>
                    </Flex>
                    <Text mt={2} color="goldenrod" fontWeight="bold">
                      Selected Limit: ₹{limit}
                    </Text>
                  </Box>
                )}
              </Box>
            )}
          </VStack>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;