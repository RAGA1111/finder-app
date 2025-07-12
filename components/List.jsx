import React from 'react'
import { Box, Flex, useMediaQuery } from '@chakra-ui/react'
import { SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import PlaceDetail from './PlaceDetail'

const List = ({places, isLoading}) => {

  const [isLargerThan550] = useMediaQuery('(min-width: 550px)')
  
  if (isLoading) return (<Flex
    direction={"column"}
    // bg={"whiteAlpha.900"}
    width={370}
    height={isLargerThan550 ? "100vh" : "390px"}
    position={"absolute"}
    left={0}
    top={0}
    zIndex={1}
    overflow="hidden"
    px={2}>

    <Box padding='6' boxShadow='lg' bg='white' mt={265}>
      <SkeletonCircle size='10' />
      <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
    </Box>
    <Box padding='6' boxShadow='lg' bg='white' mt={3}>
      <SkeletonCircle size='10' />
      <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
    </Box>
    <Box padding='6' boxShadow='lg' bg='white' mt={3}>
      <SkeletonCircle size='10' />
      <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
    </Box>
    <Box padding='6' boxShadow='lg' bg='white' mt={3}>
      <SkeletonCircle size='10' />
      <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
    </Box>
  </Flex>);

  return(
    <Flex 
    direction={"column"}
    // bg={"whiteAlpha.900"}
    width={isLargerThan550 ? 370 : "full"} 
    height={isLargerThan550 ? "100vh" : "390px"}
    position={"absolute"}
    left={0}
    top={0}
    zIndex={1}
    overflow="hidden"
    px={2}>
      <Flex flex={1} overflowY={"scroll"} mt={265} direction={"column"}>
      {places &&
          places.map((place, i) => <PlaceDetail place={place} key={i} />)}
      </Flex>
      
    </Flex>
  )

}

export default List
