import React, { useEffect, useReducer, useState } from 'react';
import fetch from 'node-fetch';
import { SafeAreaView, FlatList, StatusBar, View, Text, Image, TouchableOpacity } from "react-native";
import { Colors, Font } from "./Provider/Colorsfont";
import { mobileW, mobileH, localimag } from "./Provider/utilslib/Utils";
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export const MovieDetails = ({ route }) => {
    const [data, setData] = useState(null);
    const [poster_path, setPosterPath] = useState(null)
    const navigation = useNavigation();

    const movieId = route.params.movie_id;
    console.log(movieId)
    const goToBack = () => {
        navigation.goBack(); // Navigate to 'SecondScreen'
    };
    useEffect(() => {
        const fetchMovieDetails = async () => {
            
            try {
                const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=afe891f876e96748b7584f7c71063390
            `
                console.log('uri', url)
                const response = await fetch(
                    url
                );
                const data = await response.json();
                console.log('data', data)
                setData(data)
                fetchMoviePoster(movieId)

            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();


    }, [movieId]);

    const fetchMoviePoster = async (movieId) => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=afe891f876e96748b7584f7c71063390`
            );
            const data = await response.json();
            // Assuming data contains an array of images, extract the poster image path
            const posterPath = data?.posters[0]?.file_path;
            // Construct full URL for the poster image
            const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

            // const my_post_url=`https://api.themoviedb.org/3/movie/${movieId}/images${data.poster_path}`
            console.log(posterUrl)
            setPosterPath(posterUrl)
        } catch (error) {
            console.error('Error fetching movie poster:', error);
            return null;
        }
    };
    return (
        <View style={{ flex: 1, }}>
            <SafeAreaView style={{ flex: 0 }} />
            
             <StatusBar
        hidden={false}
        barStyle='dark-content'
        backgroundColor={Colors.whiteColor}
        translucent={false}
        networkActivityIndicatorVisible={true}
      />
            <View style={{

                width: mobileW * 90 / 100,
                height: mobileH * 7 / 100,
                alignItems:'center',
                alignSelf: 'center',
                flexDirection: 'row', aligndatas: 'center',
                justifyContent: 'space-between'
            }}>
                <TouchableOpacity

                    activeOpacity={0.9}
                    onPress={() => {
                        goToBack()
                    }}
                    style={{
                        width: mobileW * 15 / 100,

                    }}

                >
                    <Text
                        style={{

                            fontSize: mobileW * 4 / 100,
                            fontFamily: Font.FontBold,

                            color: Colors.black_color
                        }}
                    >Back
                    </Text>
                </TouchableOpacity>
                <Text
                    style={{

                        fontSize: mobileW * 5 / 100,
                        fontFamily: Font.FontBold,
                        textAlign: 'center',
                        color: Colors.black_color
                    }}
                >
                    Movie Details
                </Text>
                <View
                    style={{ width: mobileW * 15 / 100, }}
                >

                </View>
            </View>

            <KeyboardAwareScrollView style={{height:mobileH*90/100
        }}>

           
{
    data!=null &&

            <View style={{
                marginBottom:mobileH*3/100,
                alignSelf: 'center',
                width: mobileW * 90 / 100,
                elevation: 5,
                backgroundColor: Colors.whiteColor, borderRadius: mobileW * 2 / 100

            }}
            >
                <Image
                    source={{ uri: poster_path }}

                    style={{
                        alignSelf: 'center',
                        width: mobileW * 90 / 100, height: mobileH * 60 / 100,
                        borderTopLeftRadius: mobileW * 2 / 100,
                        borderTopRightRadius: mobileW * 2 / 100

                    }}
                >
                </Image>
                <View style={{ width: mobileW * 80 / 100, alignSelf: 'center', }}>


                    <Text
                        style={{
                            marginTop: mobileH * 2 / 100,
                            fontSize: mobileW * 3.8 / 100,
                            fontFamily: Font.FontSemiBold,

                            color: Colors.black_color
                        }}
                    >
                        {
                        data.title}
                    </Text>

                    <Text
                        style={{
                            marginTop: mobileH * 2 / 100,
                            fontSize: mobileW * 4 / 100,
                            fontFamily: Font.FontBold,
                            color: Colors.black_color
                        }}
                    >
                        {
                        'Genres'}
                    </Text>
                    <FlatList 

                     ItemSeparatorComponent={() =>
                         <View style={{ 
                        width: mobileH * 2 / 100 }}>

                     </View>

                     }
                     showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={data.genres}
                    renderItem={({item,index})=>
                    <Text
                        style={{
                            marginTop: mobileH * 1 / 100,
                            fontSize: mobileW * 3.8 / 100,
                            fontFamily: Font.FontRegular,

                            color: Colors.black_color
                        }}
                    >
                        {item.name}
                    </Text>
                        }
                    >

                    </FlatList>
                    
                    <Text
                        numberOfLines={10}
                        style={{
                            marginTop: mobileH * 1 / 100,
                            fontSize: mobileW * 3.8 / 100,
                            fontFamily: Font.FontMedium,

                            color: Colors.black_color
                        }}
                    >
                        {"Runtime: " +data.runtime}
                    </Text>

                    <Text
                        style={{
                            marginVertical: mobileH * 1 / 100,
                            fontSize: mobileW * 3.8 / 100,
                            fontFamily: Font.FontMedium,
                            color: Colors.black_color
                        }}
                    >
                        {
                        'Overview: '+data.overview}
                    </Text>
                   
                </View>

            </View>

                    }
                     </KeyboardAwareScrollView>

        </View>
    )
}