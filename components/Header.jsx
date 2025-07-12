import React, { useState } from 'react'
import { Flex, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItem, MenuList, SimpleGrid, Text } from '@chakra-ui/react'
import { Autocomplete} from '@react-google-maps/api'
import { BiChevronDown, BiHotel, BiMapAlt, BiRestaurant, BiSearch, BiStar } from "react-icons/bi"
// import { Rating } from '@mui/material'
import { Rating } from 'react-simple-star-rating'


const Header = ({ setType, setCoordinates, setRatings, isLoaded }) => {

    // const [libraries] = useState(['places']);
    // const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: "AIzaSyBnF_9F3qIWChIi8rKMxvnBhEX8AQTLyQk", libraries });
    
    // Para controlar el estado de los filtros
    const [btnColor, setBtnColor] = useState("black")
    const [btnRestaurants, setBtnRestaurants] = useState("green")
    const [btnAttractions, setBtnAttractions] = useState("black")

    // Para el autocomplete
    const [autocomplete, setAutocomplete] = useState(null);
    const onLoad = (autoC) => setAutocomplete(autoC);
    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();
        setCoordinates({ lat, lng });
    };

    // // Para el rating
    // const [rating, setRating] = useState(0)
    // // Catch Rating value
    // const handleRating = (rate) => {
    //     setRating(rate)
    // // other logic
    // }
    // // Optinal callback functions
    // const onPointerEnter = () => console.log('Enter')
    // const onPointerLeave = () => console.log('Leave')
    // const onPointerMove = (value, index) => console.log(value, index)

    return (
        
        <Flex position={"absolute"} top={0} left={0}
            width={"full"} px={4} py={2} zIndex={101}>
 
            <Flex>
               
                <SimpleGrid minChildWidth="330px" spacingX='5px' spacingY='10px'>
                    {/* Choose Rating Button */}
                    <Flex
                        alignItems={"center"}
                        justifyContent={"center"}>

                        {/* Para ratings */}
                        <Flex
                            alignItems={"center"}
                            justifyContent={"center"}
                            px={4}
                            py={2}
                            bg={"white"}
                            rounded={"full"}
                            ml={4}
                            shadow="lg"
                            cursor={"pointer"}
                            _hover={{ bg: "gray.100" }}
                            transition={'ease-in-out'}
                            transitionDuration={"0.3s"}
                        >
                            <Menu>
                                <BiStar fontSize={25} />
                                <MenuButton mx={2} transition="all 0.2s" borderRadius={"md"}>
                                    Choose ratings
                                </MenuButton>
                                <MenuList>
                                    <MenuItem display={"flex"}
                                        alignItems={"center"}
                                        justifyContent="center"
                                        onClick={() => { setRatings("") }}>
                                        <Text fontSize={20} fontWeight={500}
                                            color={"gray.700"}>
                                            All Rating
                                        </Text>
                                    </MenuItem>

                                    <MenuItem display={"flex"}
                                        alignItems={"center"}
                                        justifyContent="space-around"
                                        onClick={() => { setRatings(2) }}>
                                        <Text fontSize={20} fontWeight={500}
                                            color={"orange.500"}>
                                            2.0
                                        </Text>
                                        <Rating
                                            SVGstyle={{ display: 'inline-block' }}
                                            size={25}
                                            initialValue={2}
                                            readonly={true}
                                        />
                                    </MenuItem>

                                    <MenuItem
                                        display={"flex"}
                                        alignItems={"center"}
                                        justifyContent="space-around"
                                        onClick={() => setRatings(3)}
                                    >
                                        <Text fontSize={20} fontWeight={500} color={"orange.500"}>
                                            3.0
                                        </Text>
                                        <Rating
                                            SVGstyle={{ display: 'inline-block' }}
                                            size={25}
                                            initialValue={3}
                                            readonly={true}
                                        />

                                    </MenuItem>

                                    <MenuItem
                                        display={"flex"}
                                        alignItems={"center"}
                                        justifyContent="space-around"
                                        onClick={() => setRatings(4)}
                                    >
                                        <Text fontSize={20} fontWeight={500} color={"orange.500"}>
                                            4.0
                                        </Text>
                                        <Rating
                                            SVGstyle={{ display: 'inline-block' }}
                                            size={25}
                                            initialValue={4}
                                            readonly={true}
                                        />

                                    </MenuItem>

                                    <MenuItem
                                        display={"flex"}
                                        alignItems={"center"}
                                        justifyContent="space-around"
                                        onClick={() => setRatings(4.5)}
                                    >
                                        <Text fontSize={20} fontWeight={500} color={"orange.500"}>
                                            4.5
                                        </Text>
                                        <Rating
                                            SVGstyle={{ display: 'inline-block' }}
                                            size={25}
                                            initialValue={5}
                                            readonly={true}
                                        />

                                    </MenuItem>

                                </MenuList>
                            </Menu>
                            <BiChevronDown fontSize={25} />
                        </Flex>
                    </Flex>

                    {/* Restaurants Button */}
                    <Flex
                        alignItems={"center"}
                        justifyContent={"center"}
                        px={4}
                        py={2}
                        bg={"white"}
                        rounded={"full"}
                        ml={4}
                        shadow="lg"
                        cursor={"pointer"}
                        _hover={{ bg: "gray.100" }}
                        transition={'ease-in-out'}
                        transitionDuration={"0.3s"}
                        color={btnRestaurants}
                        onClick={() => { setType("restaurants"); setBtnRestaurants("green"); setBtnColor("black"); setBtnAttractions("black") }}
                    >
                        <BiRestaurant fontSize={25} />
                        <Text ml={3} fontSize={16} fontWeight={500}> Restaurants</Text>
                    </Flex>

                    {/* Hotels Button */}
                    <Flex
                        alignItems={"center"}
                        justifyContent={"center"}
                        px={4}
                        py={2}
                        bg={"white"}
                        rounded={"full"}
                        ml={4}
                        shadow="lg"
                        cursor={"pointer"}
                        _hover={{ bg: "gray.100" }}
                        transition={'ease-in-out'}
                        transitionDuration={"0.3s"}
                        color={btnColor}
                        onClick={() => { setType("hotels"); setBtnColor("green"); setBtnRestaurants("black"); setBtnAttractions("black") }}
                    >
                        <BiHotel fontSize={25} />
                        <Text ml={3} fontSize={16} fontWeight={500}> Hotels</Text>
                    </Flex>


                    {/* Attractions Button */}
                    <Flex
                        alignItems={"center"}
                        justifyContent={"center"}
                        px={4}
                        py={2}
                        bg={"white"}
                        rounded={"full"}
                        ml={4}
                        shadow="lg"
                        cursor={"pointer"}
                        _hover={{ bg: "gray.100" }}
                        transition={'ease-in-out'}
                        transitionDuration={"0.3s"}
                        color={btnAttractions}
                        onClick={() => { setType("attractions"); setBtnColor("black"); setBtnRestaurants("black"); setBtnAttractions("green") }}
                    >
                        <BiMapAlt fontSize={25} />
                        <Text ml={3} fontSize={16} fontWeight={500}> Attractions</Text>
                    </Flex>

               {isLoaded && <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                 <InputGroup width={"full"} height={"fit-content"} shadow="lg">
                    <InputRightElement pointerEvents={"none"}
                        children={<BiSearch color="gray" fontSize={20} />} />

                    <Input
                        type={"text"}
                        placeholder="Search Google Map..."
                        variant={"filled"}
                        fontSize={18}
                        bg={"white"}
                        color={"gray.700"}
                        _hover={{ bg: 'whiteAlpha.800' }}
                        _focus={{ bg: 'whiteAlpha.800' }}
                        _placeholder={{ color: "gray.700" }}
                    />
                </InputGroup>
                </Autocomplete>}
                {/* </Autocomplete> */}

                </SimpleGrid>

            </Flex>
        </Flex>
    )
}

export default Header
