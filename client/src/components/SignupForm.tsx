import React, { useEffect, useState } from "react";

import {
  Input,
  FormLabel,
  FormControl,
  VStack,
  Button,
  useToast,
  InputRightElement,
  IconButton,
  Icon,
  InputGroup,
  Text,
  Alert,
  AlertIcon,
  ListItem,
  UnorderedList,
  Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { createUser, getUserByEmail } from "../../../api/src/api/users/users.services";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignupForm = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>/?]).{6,}$/;
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [formValues, setFormValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const validatePassword = (pass: string) => {
    if (!passwordRegex.test(pass)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const validateConfirmPassword = (pass: string) => {
    if (pass !== formValues.password) {
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
    }
  };

  // Validate password and confirm password on change
  useEffect(() => {
    validatePassword(formValues.password);
    validateConfirmPassword(formValues.confirmPassword);
  }, [formValues.password, formValues.confirmPassword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formValues);

    // check if an account with that email already exists)
    const emailExists = fetch(`http://localhost:4466/api/v1/users/email/${formValues.email}`)
      .then((res) => res.json())
      .then((data) => console.log(data));

    if (emailExists != null) {
      toast({
        title: "Account with that email already exists",
        description: (
          <Text>
            An account with that email already exists.
            <br />
            <Link href="/login">
              <Text as="u">Please sign in.</Text>
            </Link>
          </Text>
        ),
        status: "error",
        duration: 10000,
        isClosable: true,
      });
      return;
    }

    const user = fetch("http://localhost:4466/api/v1/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    navigate("/");
    toast({
      title: "Account created",
      description: "Your account has been created successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <VStack as="form" spacing={4} onSubmit={handleSubmit}>
      <FormControl isRequired>
        <FormLabel>First Name</FormLabel>
        <Input
          type="text"
          id="firstName"
          placeholder="John"
          value={formValues.firstName}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Last Name</FormLabel>
        <Input
          type="text"
          id="lastName"
          placeholder="Doe"
          value={formValues.lastName}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          id="email"
          placeholder="john@email.com"
          value={formValues.email}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            value={formValues.password}
            onChange={handleChange}
          />
          <InputRightElement>
            <IconButton aria-label={"toggle view password"} onClick={toggleShowPassword}>
              <Icon as={showPassword ? AiOutlineEyeInvisible : AiOutlineEye} />
            </IconButton>
          </InputRightElement>
        </InputGroup>
        <Alert status="error" borderRadius={10} my={3} display={passwordError ? "flex" : "none"}>
          <AlertIcon />
          <VStack spacing={2}>
            <Text>Your password must satisfy the following requirements:</Text>
            <UnorderedList w="80%">
              <ListItem>At least 6 characters long</ListItem>
              <ListItem>At least 1 uppercase letter</ListItem>
              <ListItem>At least 1 lowercase letter</ListItem>
              <ListItem>At least 1 special character</ListItem>
              <ListItem>At least 1 number</ListItem>
            </UnorderedList>
          </VStack>
        </Alert>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
          />
          <InputRightElement>
            <IconButton aria-label={"toggle view password"} onClick={toggleShowConfirmPassword}>
              <Icon as={showConfirmPassword ? AiOutlineEyeInvisible : AiOutlineEye} />
            </IconButton>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Alert
        status="error"
        borderRadius={10}
        my={3}
        display={confirmPasswordError ? "flex" : "none"}
      >
        <AlertIcon />
        <Text>Your passwords must match.</Text>
      </Alert>
      <Button
        type="submit"
        w="100%"
        disabled={
          passwordError ||
          confirmPasswordError ||
          formValues.password == "" ||
          formValues.confirmPassword == ""
        }
      >
        Create Account
      </Button>
    </VStack>
  );
};

export default SignupForm;