import React, { useEffect, useState } from 'react';

import { SafeAreaView, KeyboardAwareScrollView, TextInput, Modal, FlatList, StatusBar, View, Text, Image, TouchableOpacity, Button, Settings } from "react-native";
import { Colors, Font } from "./Provider/Colorsfont";
import { mobileW, mobileH, localimag, localStorage } from "./Provider/utilslib/Utils";
import { useNavigation } from '@react-navigation/native';
export const Home = () => {
    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    const [dataAssign, setDataAssign] = useState(null);
    const navigation = useNavigation();
    const [searchStatus, setSearchStatus] = useState(false)
    const [search, setSearch] = useState('')
    const [totalPages, setTotalPages] = useState(10);
    const [genreList, setGenreList] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [isVisibleGenre, setIsVisibleGenre] = useState(false);


    const goToSecondScreen = (id) => {

        console.log('id', id)
        navigation.navigate('MovieDetails', { movie_id: id }); // Navigate to 'SecondScreen'
    };
    useEffect(async () => {
        
            fetchData()
            

    }, []);

    const fetchData = async () => {
        const fetch = require('node-fetch');

        // const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY&page=${page}`
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmU4OTFmODc2ZTk2NzQ4Yjc1ODRmN2M3MTA2MzM5MCIsInN1YiI6IjY2MGMxMmZiMTQ5NTY1MDE3ZGJiMzlmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2uXc-j0XM74VW56UlOfyqxY8dw186-tbPnzEA2nUdzM'
            }
        };

        await fetch(url, options)
            .then(res => res.json())
            .then(json => {
                console.log('json data-----', json);
                const my_data = json.results;
                if (data == null) {
                    setDataAssign(my_data)
                    setData(my_data)
                   }
                else {
                    setData((prevData) => [...prevData, ...json.results])
                    setDataAssign((prevData) => [...prevData, ...json.results])

                    
                }


            })
            .catch(err => console.error('error:' + err));
    };
    const searchMovies = (search_title) => {
        let data1 = dataAssign
        if (data1 != null) {
            console.log('data1', data1);
            if (data1 != 'NA') {
                var text_data = search_title.toString().toLowerCase();
                let newData = data1.filter(function (item) {
                    return (
                        item.title.toString().toLowerCase().indexOf(text_data) >= 0
                    )
                });
                if (newData.length > 0) {
                    setData(newData)
                } else if (newData.length <= 0) {
                    setData(null)
                }
            }
        }


    }
    const loadMore = () => {
        if (page < totalPages) {
            setPage(page + 1);
            setTimeout(() => {
                fetchData()
            }, 300);

        }
    };


    const fetchGenreList = async () => {
        try {
            const response = await fetch(
                'https://api.themoviedb.org/3/genre/movie/list?api_key=afe891f876e96748b7584f7c71063390'
            );
            const data = await response.json();
            console.log(data.genres)
            setGenreList(data.genres);
            setTimeout(() => {
                setIsVisibleGenre(true)
            }, 500);

        } catch (error) {
            console.error('Error fetching genre list:', error);
        }
    };



    const fetchMoviesByGenre = async (genreId) => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/discover/movie?api_key=afe891f876e96748b7584f7c71063390&with_genres=${genreId}`
            );
            const data = await response.json();
            console.log("by genre get data", data.results)
            setData(data.results);
            setDataAssign(data.results)
        } catch (error) {
            console.error('Error fetching movies by genre:', error);
        }
    };

    return (
        
            <SafeAreaView style={{ flex: 1 }} >
            <StatusBar
        hidden={false}
        barStyle='dark-content'
        backgroundColor={Colors.whiteColor}
        translucent={false}
        networkActivityIndicatorVisible={true}
      />
            <Modal
                visible={isVisibleGenre}
                animationType="slide"
                transparent={true}
                onRequestClose={() => {
                    setIsVisibleGenre(false);
                }}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: Colors.whiteColor,
                        width: mobileW,
                        height: mobileH,
                    }}>


                    <View
                        style={{
                            width: mobileW,
                            flexDirection: 'row',
                            paddingHorizontal: (mobileW * 5) / 100,
                        }}>
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: (mobileW * 3) / 100,
                            }}
                            onPress={() => {
                                setIsVisibleGenre(false);
                            }}>

                            <Text
                                style={{
                                    color: Colors.welcome_view_txt_clr,
                                    fontSize: (mobileW * 3.8) / 100,
                                }}>
                                Back
                            </Text>
                        </TouchableOpacity>
                    </View>


                    <View
                        style={{
                            alignSelf: 'center',
                            width: (mobileW * 90) / 100,
                            paddingVertical: (mobileW * 3.5) / 100,
                            borderRadius: (mobileW * 2) / 100,

                        }}>

                        <Text
                            style={{
                                color: Colors.welcome_text_color,
                                fontSize: (mobileW * 6) / 100,
                                fontFamily: Font.FontSemiBold,
                            }}>
                            {"Select Genre"}
                        </Text>
                    </View>
                    {console.log(genreList)}
                    {
                        genreList.length != 0 &&

                        <FlatList
                            ItemSeparatorComponent={() =>
                                <View style={{ height: mobileH * 2 / 100 }}>
                                </View>
                            }
                            contentContainerStyle={{ paddingBottom: mobileH * 3 / 100, alignSelf: 'center' }}
                            data={genreList}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => {
                                        setIsVisibleGenre(false)
                                        setData(null)
                                        setTimeout(() => {
                                            fetchMoviesByGenre(item.id)
                                        },
                                            500);




                                    }}

                                    style={[
                                        {
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: (mobileW * 90) / 100,
                                            height: (mobileH * 6) / 100,
                                            backgroundColor: Colors.white_color,
                                            borderRadius: (mobileW * 3) / 100,
                                            borderWidth: (mobileW * 0.8) / 100,
                                        },
                                        { borderColor: Colors.green_accept_bg },
                                    ]}>

                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            color: Colors.black_color,
                                            fontSize: (mobileW * 3.8) / 100,
                                            fontFamily: Font.FontRegular,
                                        }}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>


                            )}></FlatList>
                    }




                </View>
            </Modal>
            {

                searchStatus == true ?
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        alignSelf: 'center',
                        width: mobileW * 90 / 100,
                        paddingVertical: mobileH * 2.75 / 100,
                    }}>
                        <View style={{
                            borderWidth:mobileW*0.2/100,
borderColor:Colors.redColor,
                            width: mobileW * 60 / 100,
                            backgroundColor: search.length == 0 ? Colors.redColor : Colors.white_color,
                            borderRadius: mobileW * 5 / 100,
                        }}>
                            <TextInput
                                value={search}
                                keyboardType='default'
                                returnKeyType="done"
                                onChangeText={(value) => {
                                    setSearch(value)
                                    searchMovies(value)
                                }}
                                maxLength={50}
                                style={{
                                    width: mobileW * 60 / 100,

paddingHorizontal:mobileW*5/100,
                                    color: search.length == 0 ? Colors.white_color : Colors.black_color,
                                    borderRadius: mobileW * 5 / 100, fontSize: mobileW * 3.8 / 100,
                                    fontFamily: Font.FontRegular
                                }}
                                placeholder={'Search by title'}
                                placeholderTextColor={Colors.white_color}>

                            </TextInput>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                setSearch('')
                                setSearchStatus(!searchStatus)
                                setData(dataAssign)
                            }}
                            style={{}}
                        >
                            <Text
                                style={{

                                    fontSize: mobileW * 3.8 / 100,
                                    fontFamily: Font.FontRegular,
                                    textAlign: 'center',
                                    color: Colors.black_color
                                }}
                            >
                                Cancel search
                            </Text>
                        </TouchableOpacity>

                    </View>
                    :
                    <View
                        style={{
                            paddingVertical: mobileH * 1 / 100,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            alignSelf: 'center',
                            width: mobileW * 90 / 100,
                        }}
                    >
                        <Text
                            style={{
                                marginVertical: mobileH * 3 / 100,
                                fontSize: mobileW * 5 / 100,
                                fontFamily: Font.FontBold,
                                textAlign: 'center',
                                color: Colors.black_color
                            }}
                        >
                            Movie List
                        </Text>
                        <View
                            style={{
                                width: mobileW * 30 / 100,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => {
                                    fetchGenreList()
                                }}
                                style={{}}
                            >

                                <Text
                                    style={{
                                        marginVertical: mobileH * 3 / 100,
                                        fontSize: mobileW * 3.8 / 100,
                                        fontFamily: Font.FontRegular,
                                        textAlign: 'center',
                                        color: Colors.black_color
                                    }}
                                >
                                    Filter
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => {
                                    setSearchStatus(!searchStatus)
                                }}
                                style={{}}
                            >

                                <Text
                                    style={{
                                        marginVertical: mobileH * 3 / 100,
                                        fontSize: mobileW * 3.8 / 100,
                                        fontFamily: Font.FontRegular,
                                        textAlign: 'center',
                                        color: Colors.black_color
                                    }}
                                >
                                    Search
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            }
            {
                data != null &&

                <View style={{
                    height: mobileH * 90 / 100,

                }}>

                    <FlatList
                        ListFooterComponent={() => (
                            <>
                                {page < totalPages &&
                                    <View style={{
                                        alignSelf: 'center',
                                        width: mobileW * 40 / 100,
                                        marginTop: mobileH * 1 / 100
                                    }}>
                                        <Button style={{ borderRadius: mobileW * 5 / 100 }} title="Load More" onPress={loadMore} />
                                    </View>

                                }
                            </>
                        )}
                        numColumns={2}
                        contentContainerStyle={{ paddingBottom: mobileH * 8 / 100, width: mobileW, paddingHorizontal: mobileW * 5 / 100, alignSelf: 'center' }}
                        data={data}
                        ItemSeparatorComponent={() => <View style={{ height: mobileH * 2 / 100 }}>

                        </View>

                        }
                        renderItem={({ item, index }) =>

                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => {
                                    goToSecondScreen(item.id)
                                }}
                                style={
                                    [{

                                        width: mobileW * 44 / 100, height: mobileH * 40 / 100,
                                        elevation: 5,

                                        backgroundColor: Colors.whiteColor, borderRadius: mobileW * 2 / 100
                                    }
                                        ,
                                    index % 2 == 0 &&
                                    {
                                        marginRight: mobileW * 2 / 100
                                    }
                                    ]
                                }>

                                <View style={{ width: mobileW * 40 / 100, alignSelf: 'center', }}>


                                    <Text
                                        style={{
                                            marginTop: mobileH * 2 / 100,
                                            fontSize: mobileW * 3.8 / 100,
                                            fontFamily: Font.FontSemiBold,

                                            color: Colors.black_color
                                        }}
                                    >
                                        {item.title}
                                    </Text>
                                    <Text
                                        style={{
                                            marginTop: mobileH * 1 / 100,
                                            fontSize: mobileW * 3.8 / 100,
                                            fontFamily: Font.FontRegular,

                                            color: Colors.black_color
                                        }}
                                    >
                                        {item.release_date}
                                    </Text>
                                    <Text
                                        numberOfLines={10}
                                        style={{
                                            marginTop: mobileH * 1 / 100,
                                            fontSize: mobileW * 3.8 / 100,
                                            fontFamily: Font.FontMedium,

                                            color: Colors.black_color
                                        }}
                                    >
                                        {item.overview}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        }
                    >

                    </FlatList>


                </View>

            }
        </SafeAreaView>
    )
}