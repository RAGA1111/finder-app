import { Badge, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { IoLocation } from "react-icons/io5";
import { Rating } from 'react-simple-star-rating'

const PlaceDetail = ({ place }) => {
  if(place.name)
  return (
    // Flex1, toda la card, contiene el Flex2 y la línea de la dirección abajo
    <Flex
      bg={"whiteAlpha.900"}
      px={4}
      py={2}
      mb={2}
      shadow="lg"
      direction={"column"}
      alignItems={"start"}
      justifyContent="space-between"
    >
      {/* Flex2 contiene el Flex 3 y la imagen a un lado */}
      <Flex justifyContent={"space-between"} width="full">
        {/* Flex3, contiene 5 flex más, uno por cada línea de info de la card */}
        <Flex
          direction={"column"}
          justifyContent={"start"}
          alignItems={"start"}
          width="full"
          px={2}
        >
          {/* Flex4, primera línea título y precio */}
          <Flex
            alignItems={"center"}
            width={"full"}
            justifyContent={"space-between"}
          >
            <Text
              textTransform={"capitalize"}
              width={"40"}
              fontSize={"lg"}
              fontWeight={"500"}
              isTruncated
            >
              {place.name}
            </Text>

            <Text fontSize={"sm"} fontWeight={"500"} color={"gray.500"}>
              {place.price}
            </Text>
          </Flex>

          {/* Ratings */}
          <Flex alignItems={"center"} width={"full"}>
            {/* <Ratin size="small" value={Number(place.rating)} readOnly /> */}
            <Rating

                                        SVGstyle={{ display: 'inline-block' }}
                                        size={15}
                                        initialValue={Number(place.rating)}
                                        readonly={true}

                                    />
            <Text
              fontSize={"sm"}
              fontWeight={"500"}
              color={"gray.500"}
            >{`(${place.num_reviews})`}</Text>
            <Text
              fontSize={"sm"}
              fontWeight={"500"}
              color={"gray.500"}
              ml={"auto"}
            >
              {place.price_level}
            </Text>
          </Flex>

          {/* Ranking */}
          <Text fontSize={"sm"} fontWeight={"500"} color={"gray.400"}>
            {place.ranking}
          </Text>

          {/* Open status */}
          <Text fontSize={"sm"} fontWeight={"500"} color={"gray.600"}>
            {place.open_now_text}
          </Text>

          {/* dietary_restrictions */}
          {place?.dietary_restrictions && (
            <Flex width={"full"} flexWrap={"wrap"}>
              {place.dietary_restrictions.map((n, i) => (
                <Badge
                  colorScheme={"teal"}
                  cursor={"pointer"}
                  key={i}
                  m={1}
                  fontSize={10}
                >
                  {n.name}
                </Badge>
              ))}
            </Flex>
          )}
        </Flex>
        <Image
          objectFit={"cover"}
          width={"120px"}
          height={"120px"}
          rounded="lg"
          src={
            place.photo
              ? place.photo.images.large.url
              : "https://explorelompoc.com/wp-content/uploads/2021/06/food_placeholder.jpg"
          }
        />
      </Flex>

      {place?.address && (
        <Flex alignItems={"center"} width={"full"} px={1} my={2}>
          <IoLocation fontSize={20} color="gray" />
          <Text
            isTruncated
            fontSize={"small"}
            fontWeight={500}
            color={"gray.700"}
            ml={1}
          >
            {place.address}
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default PlaceDetail;