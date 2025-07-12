import { Box, Image, Text, useMediaQuery } from '@chakra-ui/react'
import React, { useState } from 'react'
import GoogleMapReact from "google-map-react"
import { IoLocation } from 'react-icons/io5'
import { BiX } from 'react-icons/bi'


const Map = ({isLoaded, setCoordinates, coordinates, setBounds, places}) => {
  
  const [isLargerThan550] = useMediaQuery('(min-width: 550px)')
  const [isCard, setIsCard] = useState(false);
  const [cardData, setCardData] = useState(null);

    // const defaultProps = {
    //     center: {
    //       lat: 10.99835602,
    //       lng: 77.01502627
    //     },
    //     zoom: 11
    //   };
    return (
    // <Box width={"100%"} height={"100%"}>
    // <GoogleMapReact
    //     bootstrapURLKeys={{key: ""}}
    //     defaultCenter={coordinates}
    //     center = {coordinates}
    //     defaultZoom = {10}
    //     margin={[50,50,50,50]}
    //     options={""}
    //     // onChange={()=>{}}
    //     // onChildClick={()=>{}}
    //     >

    // </GoogleMapReact>
    // </Box>
    <Box width={"100%"} 
    height={isLargerThan550 ? "100%" : "1000px"}
    >
    <div style={{ height: '100%', width: '100%' }}>
    {isLoaded && 
      <GoogleMapReact
        // bootstrapURLKeys={{ key: ""}}
        // libraries={['places']}
        defaultCenter={coordinates}
        defaultZoom={15}
        center={coordinates}
        onChange={(e)=>{
          console.log(e) //Información en un objeto con los límites, coordenadas y zoom del mapa
          setCoordinates({lat:e.center.lat , lng:e.center.lng})
          // console.log(coordinates, "coordinates")
          setBounds({ne : e.marginBounds.ne, nw: e.marginBounds.nw, se : e.marginBounds.se, sw: e.marginBounds.sw})
        }}
        onChildClick={(child) => {
          setCardData(places[child]);
          setIsCard(true);
        }}
      >
        {/* <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        /> */}
        {places?.map((place, i) => (
          <Box
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            position={"relative"}
            cursor="pointer"
          >
            <IoLocation color="red" fontSize={30} />
          </Box>
        ))}

{isCard && (
          <Box
            width={"200px"}
            height={"150px"}
            bg={"whiteAlpha.900"}
            position={"absolute"}
            top={isLargerThan550 ? -12 : 51}
            left={0}
            shadow={"lg"}
            rounded={"lg"}
          >
            <Image
              objectFit={"cover"}
              width={"full"}
              height={"120px"}
              rounded="lg"
              src={
                cardData?.photo
                  ? cardData?.photo?.images?.large?.url
                  : "https://explorelompoc.com/wp-content/uploads/2021/06/food_placeholder.jpg"
              }
            />

            <Text
              textTransform={"capitalize"}
              width={"40"}
              fontSize={"lg"}
              fontWeight={"500"}
              isTruncated
            >
              {cardData.name}
            </Text>

            <Box
              cursor={"pointer"}
              position={"absolute"}
              top={2}
              right={2}
              width={"30px"}
              height={"30px"}
              bg={"red.300"}
              rounded={"full"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              onClick={() => {
                setIsCard(false);
              }}
            >
              <BiX fontSize={20} />
            </Box>
          </Box>
        )}

      </GoogleMapReact>}
     
    </div>
    </Box>
  )
}

export default Map