var writeToAddressTimes = [];
var writeToAddressTimes_onlysign = [];
var readMessageTimes = [];
var readMessageTimes_onlysign = [];
var deleteMessageTimes = [];
var deleteMessageTimes_onlysign = [];
var mixMessageTimes = [];
var decryptionTimes = [];

/*
 * These addresses are available in the database for testing
 */
var knownAddresses = [
    { "address": "fi2by", "symmetricKey": "{\"alg\":\"A256CBC\",\"ext\":true,\"k\":\"DpsGRWacReDw4UYuHzQ0SGCMomAjtjr2rfXXOw1Ot3k\",\"key_ops\":[\"encrypt\",\"decrypt\"],\"kty\":\"oct\"}", "readKey": "{\"crv\":\"P-256\",\"d\":\"BcjVg-3v33FEtXJFsmNSCX3fbQZzAdOawiVIc_m6uQ4\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"9Ypb8UDTO01lF7D6vzGV_eeqLsPXPQGiJepljulyZcE\",\"y\":\"NewFOMre1ZLwwotEhd56clEe34hPIKdeYGuQ72KyOcY\"}", "readKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"9Ypb8UDTO01lF7D6vzGV_eeqLsPXPQGiJepljulyZcE\",\"y\":\"NewFOMre1ZLwwotEhd56clEe34hPIKdeYGuQ72KyOcY\"}", "writeKey": "{\"crv\":\"P-256\",\"d\":\"RdMvHSQsLPuCsA8DRDVl-3gSIEAl2WKkSEKm9S-LFKc\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"AUwL1fStMZ7p5q09AxyjJLOeEam-ZkXrCZAtSX8l0To\",\"y\":\"ustCTHLB86-5w-pDMgo0nWofaL6oHyFyCuDjfEstbjw\"}", "writeKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"AUwL1fStMZ7p5q09AxyjJLOeEam-ZkXrCZAtSX8l0To\",\"y\":\"ustCTHLB86-5w-pDMgo0nWofaL6oHyFyCuDjfEstbjw\"}", "ownKey": "{\"crv\":\"P-256\",\"d\":\"Peh_yvIB_Vz7s1_lq0kn2X8oSJROeqNfTSiZSRo8iMs\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"vcinsvXMfG0RgBCk900oiMoHYFNTjmhkkW47Jbzbq50\",\"y\":\"sb6C2LNfNtyx4K71fyqFXfUYu98NFbaqsN3prPMWEXU\"}", "ownKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"vcinsvXMfG0RgBCk900oiMoHYFNTjmhkkW47Jbzbq50\",\"y\":\"sb6C2LNfNtyx4K71fyqFXfUYu98NFbaqsN3prPMWEXU\"}" },
    { "address": "b9tmc", "symmetricKey": "{\"alg\":\"A256CBC\",\"ext\":true,\"k\":\"-5lM0bpw8P60-MZEuvAGR175vwiLF4RWva0ojqXTlaA\",\"key_ops\":[\"encrypt\",\"decrypt\"],\"kty\":\"oct\"}", "readKey": "{\"crv\":\"P-256\",\"d\":\"umwJAJtmxBmG4l5HRCP7OJlFAR7aGNi9K0vBxNRPd5A\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"wsiWEuCC9oIUeAMe4F9FIUfG1BIFf61ytsR3PiuGwyE\",\"y\":\"es7pdMGnI1aw5eozIG2wM2QQVz5GsiJFvtHHmfI2Opw\"}", "readKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"wsiWEuCC9oIUeAMe4F9FIUfG1BIFf61ytsR3PiuGwyE\",\"y\":\"es7pdMGnI1aw5eozIG2wM2QQVz5GsiJFvtHHmfI2Opw\"}", "writeKey": "{\"crv\":\"P-256\",\"d\":\"aDm4YQuikHmKdxodKsA8dnfO2R4tLx9yr4ztEIlTSZo\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"zcs6q4Zr4oWf_YKO5Km9F3Fz2F9JsCYixQ9fiF7OJaA\",\"y\":\"aMxi19-zaUgAgfc4aHSK8rv9pzG_BV9xlZ5LNawBGt4\"}", "writeKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"zcs6q4Zr4oWf_YKO5Km9F3Fz2F9JsCYixQ9fiF7OJaA\",\"y\":\"aMxi19-zaUgAgfc4aHSK8rv9pzG_BV9xlZ5LNawBGt4\"}", "ownKey": "{\"crv\":\"P-256\",\"d\":\"t-0iiIR7B7hbVQRJXh6oTZjbcuGNa0XerXpikAeiH4A\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"ThTcjUeob3VZG_L9o2GnkGpuUDf0HNE5uBMs2S1UkpA\",\"y\":\"dLjd6KefQtF26Q1ANjJqJkhO6jcY61_g51H8wWYTAZc\"}", "ownKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"ThTcjUeob3VZG_L9o2GnkGpuUDf0HNE5uBMs2S1UkpA\",\"y\":\"dLjd6KefQtF26Q1ANjJqJkhO6jcY61_g51H8wWYTAZc\"}" },
    { "address": "27c8o", "symmetricKey": "{\"alg\":\"A256CBC\",\"ext\":true,\"k\":\"lEmgmeOIhMbG_BGCDjJNTM2drsQ4R2qzIBxhZMrz5ZY\",\"key_ops\":[\"encrypt\",\"decrypt\"],\"kty\":\"oct\"}", "readKey": "{\"crv\":\"P-256\",\"d\":\"2tCiuwrXBsNS_5S5ZAiqcrLRK029CVX_Jd7ZC7eOeTg\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"-KbwOOYcWPXzCozZxMNlpbW_DTrbwSp4yiBRuN2XB68\",\"y\":\"bN6yTfsCrUhl6sMhT5zFIsP5x6aFhJLTUHFVRoec1n0\"}", "readKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"-KbwOOYcWPXzCozZxMNlpbW_DTrbwSp4yiBRuN2XB68\",\"y\":\"bN6yTfsCrUhl6sMhT5zFIsP5x6aFhJLTUHFVRoec1n0\"}", "writeKey": "{\"crv\":\"P-256\",\"d\":\"4sUCFUw56mK5sICsqqsoXT_a2HpmIndEDuyuCJXiyyU\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"VC6iKUHX7K7NauxS9bDdcwIHtnM1NNmDq4Bhb1lRV2Y\",\"y\":\"UY3VSz-xCAXp3rtpXAwWYRtNEnb5zsxO7Eu8Ghu5goQ\"}", "writeKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"VC6iKUHX7K7NauxS9bDdcwIHtnM1NNmDq4Bhb1lRV2Y\",\"y\":\"UY3VSz-xCAXp3rtpXAwWYRtNEnb5zsxO7Eu8Ghu5goQ\"}", "ownKey": "{\"crv\":\"P-256\",\"d\":\"V8nDmUeDzHhba_-_0DMk_0HYokE41D3R1aIOsYfnjao\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"1-jAhJFdranQ6DVu1n7nyYPjQYkgx-GLo3shP4mVC20\",\"y\":\"KCfrLRIgh1AGJ3tK2dHWFzi19HwUGO7gXWWsU_2mUSo\"}", "ownKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"1-jAhJFdranQ6DVu1n7nyYPjQYkgx-GLo3shP4mVC20\",\"y\":\"KCfrLRIgh1AGJ3tK2dHWFzi19HwUGO7gXWWsU_2mUSo\"}" },
    { "address": "zkyfh", "symmetricKey": "{\"alg\":\"A256CBC\",\"ext\":true,\"k\":\"XsTn-zDFQRwlpghLBtEU_NfQofuT5hmLxb5pPaVmSdo\",\"key_ops\":[\"encrypt\",\"decrypt\"],\"kty\":\"oct\"}", "readKey": "{\"crv\":\"P-256\",\"d\":\"yRfTfcWl19QxkdM-OXtU-byqjraS6dIe680hzXCAtT4\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"_VOTJNdcy8YsjPci_qmhIfuYJX1SB7y-ftUY_JpGFTM\",\"y\":\"8VdLR7-hZ4uVEPEefhkT0eIS-2WD8xIXbY7Uy0o0Z4I\"}", "readKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"_VOTJNdcy8YsjPci_qmhIfuYJX1SB7y-ftUY_JpGFTM\",\"y\":\"8VdLR7-hZ4uVEPEefhkT0eIS-2WD8xIXbY7Uy0o0Z4I\"}", "writeKey": "{\"crv\":\"P-256\",\"d\":\"zznhFKzfCeAnpGEz6BqjQ2CAyfN0Iu6kKWJAS6peuiU\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"bTmR6PQZalfdZoV2wG7BKxBl7Ok2OpQzKDOz_snIDJM\",\"y\":\"W0pnJRFEYbIpk8_O7bKRU731kMnWbzhyKb2qCP7V-i8\"}", "writeKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"bTmR6PQZalfdZoV2wG7BKxBl7Ok2OpQzKDOz_snIDJM\",\"y\":\"W0pnJRFEYbIpk8_O7bKRU731kMnWbzhyKb2qCP7V-i8\"}", "ownKey": "{\"crv\":\"P-256\",\"d\":\"84QMpZwFwrt4538U6ZQDlcrGhy-jifD1UKD7cuzpAL8\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"bYQHf2WnOjrIZWHY31ds8zpvs8Iy2ey88HiRUpFl2G4\",\"y\":\"RAU7UQ82prsMZAxtHzggRhbnxcAwzcpCZg9CipazZjg\"}", "ownKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"bYQHf2WnOjrIZWHY31ds8zpvs8Iy2ey88HiRUpFl2G4\",\"y\":\"RAU7UQ82prsMZAxtHzggRhbnxcAwzcpCZg9CipazZjg\"}" },
    { "address": "ek6ia", "symmetricKey": "{\"alg\":\"A256CBC\",\"ext\":true,\"k\":\"CoRwOiT_tbriCtNURNmNpDA_YOumamuxAjcEz0W_Ze8\",\"key_ops\":[\"encrypt\",\"decrypt\"],\"kty\":\"oct\"}", "readKey": "{\"crv\":\"P-256\",\"d\":\"Wrzu1ZKAS7_ptMzws0vrjAlX2yATul4I2QYKUyP6fEI\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"Qf0x43YqEB87y6E54AZfoOeJCKq2CGnuszH25Cy8m9U\",\"y\":\"FG2Eh2byVTJcMFufYbpZa6M0UZDUsGZeIbEc-p5MH2Q\"}", "readKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"Qf0x43YqEB87y6E54AZfoOeJCKq2CGnuszH25Cy8m9U\",\"y\":\"FG2Eh2byVTJcMFufYbpZa6M0UZDUsGZeIbEc-p5MH2Q\"}", "writeKey": "{\"crv\":\"P-256\",\"d\":\"S5x5XO27atmIsFo6DB4APK1w2ZhrkyXFrPZPt6ofPFc\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"pjg9FKO1AQTeA7j-06ALcgZzO7U9zlUztj_Mt1zYIUc\",\"y\":\"9Ws7MXnjEKlusjjp1emnlalLsfnjDwYz5UIEWe7pfr8\"}", "writeKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"pjg9FKO1AQTeA7j-06ALcgZzO7U9zlUztj_Mt1zYIUc\",\"y\":\"9Ws7MXnjEKlusjjp1emnlalLsfnjDwYz5UIEWe7pfr8\"}", "ownKey": "{\"crv\":\"P-256\",\"d\":\"MKVs1QB3HoRNfydqD9PvSW0KvPYHJ7cKu5QKdHCtgNQ\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"LZEoRTmfam2BPts21oGPEe-FYpv9HSGme8XgqQkshpg\",\"y\":\"S3-2lEKVV5njL01zBX8MaDRI14LCbjn1dXMz7jeO7BY\"}", "ownKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"LZEoRTmfam2BPts21oGPEe-FYpv9HSGme8XgqQkshpg\",\"y\":\"S3-2lEKVV5njL01zBX8MaDRI14LCbjn1dXMz7jeO7BY\"}" },
    { "address": "jdo75", "symmetricKey": "{\"alg\":\"A256CBC\",\"ext\":true,\"k\":\"Wy5RVu2_PRKNSwYkR7Mg1PaoQObWiLjG7MPjrNuaFxg\",\"key_ops\":[\"encrypt\",\"decrypt\"],\"kty\":\"oct\"}", "readKey": "{\"crv\":\"P-256\",\"d\":\"AvDYmgk48-Ajs6G1zjVMXreQ0SdIDFwQwi7SoHNDdvI\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"BsbbJPy691Jrelk9KfDW6eR74QLHGrrP9Ov5HwRh2_A\",\"y\":\"h0IBdagmy51-vE4pk7c4iUwY4Dy7khx1HCbdT7_m0eY\"}", "readKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"BsbbJPy691Jrelk9KfDW6eR74QLHGrrP9Ov5HwRh2_A\",\"y\":\"h0IBdagmy51-vE4pk7c4iUwY4Dy7khx1HCbdT7_m0eY\"}", "writeKey": "{\"crv\":\"P-256\",\"d\":\"ZKbaACD5TUQ8i5MJdyS3i6xz4XsHp1-yCp8oxyZAwnc\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"p9BYI5OaUkSsRbMRtdZglYTOm9JjaDJW0M3cV4tomQ4\",\"y\":\"u-pqZ5DwesKWzWsYSoaeIeAFx9-C1kylnNRtcGLCOgQ\"}", "writeKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"p9BYI5OaUkSsRbMRtdZglYTOm9JjaDJW0M3cV4tomQ4\",\"y\":\"u-pqZ5DwesKWzWsYSoaeIeAFx9-C1kylnNRtcGLCOgQ\"}", "ownKey": "{\"crv\":\"P-256\",\"d\":\"Y_sjO37BWFJqkoXPbEDimGp-DivOJo3Sh-ayMlYVM3Q\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"XUebx7Fz9pnrTyeD-ZNRegURXir_ichPFMVLspM8nzk\",\"y\":\"0ZylY-af7c4Lkc70oSLfri5FHrXhHQdzZ4jz1j49kXA\"}", "ownKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"XUebx7Fz9pnrTyeD-ZNRegURXir_ichPFMVLspM8nzk\",\"y\":\"0ZylY-af7c4Lkc70oSLfri5FHrXhHQdzZ4jz1j49kXA\"}" },
    { "address": "xxzif", "symmetricKey": "{\"alg\":\"A256CBC\",\"ext\":true,\"k\":\"xFAunkEM4Ch3dXJOQECTui3yri4ud1MFZn7Srw-h2Z4\",\"key_ops\":[\"encrypt\",\"decrypt\"],\"kty\":\"oct\"}", "readKey": "{\"crv\":\"P-256\",\"d\":\"eb-EcEoCLGaSzETYTxZaZ8R3mDiZiFW9cX_JSiwIblk\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"EdJwwp3N_VqJw-4AlN_Uer1umYbheFynOre8gSeS1sE\",\"y\":\"9a0LqnGQuDXfJZZOBdsmw3Oyf5gLkmjZkfpO00HCG4Q\"}", "readKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"EdJwwp3N_VqJw-4AlN_Uer1umYbheFynOre8gSeS1sE\",\"y\":\"9a0LqnGQuDXfJZZOBdsmw3Oyf5gLkmjZkfpO00HCG4Q\"}", "writeKey": "{\"crv\":\"P-256\",\"d\":\"kj7zMQ1sl4EizJLNyCv3a-kbgwWEfzppMG-VxrU7HzY\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"SMgjkfWdWOHA3WD7ITsfBCCQisI3dG7q4aPsPa2nmDY\",\"y\":\"mLmUPdG-bAwEff43t6N58Qg6dybIOdlRaeiM6gcS-ZU\"}", "writeKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"SMgjkfWdWOHA3WD7ITsfBCCQisI3dG7q4aPsPa2nmDY\",\"y\":\"mLmUPdG-bAwEff43t6N58Qg6dybIOdlRaeiM6gcS-ZU\"}", "ownKey": "{\"crv\":\"P-256\",\"d\":\"JoJtiff-9orwPhKiNByuLUb9VqtbA5AXIjH6Zec6G6U\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"oyTNMwtCnKMMI5WsjfIijZ0mJdlWDhrugpq8c7Hr4jQ\",\"y\":\"7TrEEhpoIwEZBhXLzZX7ysJ4rOIsgTIhLQ2z-CvxgeI\"}", "ownKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"oyTNMwtCnKMMI5WsjfIijZ0mJdlWDhrugpq8c7Hr4jQ\",\"y\":\"7TrEEhpoIwEZBhXLzZX7ysJ4rOIsgTIhLQ2z-CvxgeI\"}" }
];

/*
 * For simplicity all addresskeys are similar
 */
var addressesOfUserProfile = [
    { "address": "3fbox", "symmetricKey": "{\"alg\":\"A256CBC\",\"ext\":true,\"k\":\"rVHuUy5gNQ4p90OLJwxsuC-mBrC9toxwG1lwoa1RDUI\",\"key_ops\":[\"encrypt\",\"decrypt\"],\"kty\":\"oct\"}", "readKey": "{\"crv\":\"P-256\",\"d\":\"O4GB02JieTybTrwjvgS_E537xnT8s577Z-aHTcL08e4\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"7wWAdTMduuvXuMSVjz-5r--j3TRnPbdXw24_PPaJI5w\",\"y\":\"zRilFviFEzNh2u5aJ2w-bDA7gku45fPdETRRvLALuh8\"}", "readKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"7wWAdTMduuvXuMSVjz-5r--j3TRnPbdXw24_PPaJI5w\",\"y\":\"zRilFviFEzNh2u5aJ2w-bDA7gku45fPdETRRvLALuh8\"}", "writeKey": "{\"crv\":\"P-256\",\"d\":\"aIcGXN2eFOuL_K0jmu-bEC_R8dQitKwk-JARQleFl_w\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"TqP3FJwksWCek3HgevoABAXnxla4QTQOKQbHTDZzLJM\",\"y\":\"177TAIJl9EcjgzyCZd94pgYkj2dRVfEfDgvHUafJ224\"}", "writeKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"TqP3FJwksWCek3HgevoABAXnxla4QTQOKQbHTDZzLJM\",\"y\":\"177TAIJl9EcjgzyCZd94pgYkj2dRVfEfDgvHUafJ224\"}", "ownKey": "{\"crv\":\"P-256\",\"d\":\"vAjH1BVvW1FlZOrGG9ddHWRWBgLfBUWw7cVkR8CD6Yc\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"MDgHgQ39WuV0zVCjRWYTwEFMFDF3nVNM_Ih2wMO08CE\",\"y\":\"xXjsMqxTlMa0jKK5drAD3eHiEdFQNlUXHfh3bIu43_Y\"}", "ownKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"MDgHgQ39WuV0zVCjRWYTwEFMFDF3nVNM_Ih2wMO08CE\",\"y\":\"xXjsMqxTlMa0jKK5drAD3eHiEdFQNlUXHfh3bIu43_Y\"}" },
    { "address": "yixo6", "symmetricKey": "{\"alg\":\"A256CBC\",\"ext\":true,\"k\":\"rVHuUy5gNQ4p90OLJwxsuC-mBrC9toxwG1lwoa1RDUI\",\"key_ops\":[\"encrypt\",\"decrypt\"],\"kty\":\"oct\"}", "readKey": "{\"crv\":\"P-256\",\"d\":\"O4GB02JieTybTrwjvgS_E537xnT8s577Z-aHTcL08e4\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"7wWAdTMduuvXuMSVjz-5r--j3TRnPbdXw24_PPaJI5w\",\"y\":\"zRilFviFEzNh2u5aJ2w-bDA7gku45fPdETRRvLALuh8\"}", "readKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"7wWAdTMduuvXuMSVjz-5r--j3TRnPbdXw24_PPaJI5w\",\"y\":\"zRilFviFEzNh2u5aJ2w-bDA7gku45fPdETRRvLALuh8\"}", "writeKey": "{\"crv\":\"P-256\",\"d\":\"aIcGXN2eFOuL_K0jmu-bEC_R8dQitKwk-JARQleFl_w\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"TqP3FJwksWCek3HgevoABAXnxla4QTQOKQbHTDZzLJM\",\"y\":\"177TAIJl9EcjgzyCZd94pgYkj2dRVfEfDgvHUafJ224\"}", "writeKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"TqP3FJwksWCek3HgevoABAXnxla4QTQOKQbHTDZzLJM\",\"y\":\"177TAIJl9EcjgzyCZd94pgYkj2dRVfEfDgvHUafJ224\"}", "ownKey": "{\"crv\":\"P-256\",\"d\":\"vAjH1BVvW1FlZOrGG9ddHWRWBgLfBUWw7cVkR8CD6Yc\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"MDgHgQ39WuV0zVCjRWYTwEFMFDF3nVNM_Ih2wMO08CE\",\"y\":\"xXjsMqxTlMa0jKK5drAD3eHiEdFQNlUXHfh3bIu43_Y\"}", "ownKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"MDgHgQ39WuV0zVCjRWYTwEFMFDF3nVNM_Ih2wMO08CE\",\"y\":\"xXjsMqxTlMa0jKK5drAD3eHiEdFQNlUXHfh3bIu43_Y\"}" },
    { "address": "8x6to", "symmetricKey": "{\"alg\":\"A256CBC\",\"ext\":true,\"k\":\"rVHuUy5gNQ4p90OLJwxsuC-mBrC9toxwG1lwoa1RDUI\",\"key_ops\":[\"encrypt\",\"decrypt\"],\"kty\":\"oct\"}", "readKey": "{\"crv\":\"P-256\",\"d\":\"O4GB02JieTybTrwjvgS_E537xnT8s577Z-aHTcL08e4\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"7wWAdTMduuvXuMSVjz-5r--j3TRnPbdXw24_PPaJI5w\",\"y\":\"zRilFviFEzNh2u5aJ2w-bDA7gku45fPdETRRvLALuh8\"}", "readKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"7wWAdTMduuvXuMSVjz-5r--j3TRnPbdXw24_PPaJI5w\",\"y\":\"zRilFviFEzNh2u5aJ2w-bDA7gku45fPdETRRvLALuh8\"}", "writeKey": "{\"crv\":\"P-256\",\"d\":\"aIcGXN2eFOuL_K0jmu-bEC_R8dQitKwk-JARQleFl_w\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"TqP3FJwksWCek3HgevoABAXnxla4QTQOKQbHTDZzLJM\",\"y\":\"177TAIJl9EcjgzyCZd94pgYkj2dRVfEfDgvHUafJ224\"}", "writeKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"TqP3FJwksWCek3HgevoABAXnxla4QTQOKQbHTDZzLJM\",\"y\":\"177TAIJl9EcjgzyCZd94pgYkj2dRVfEfDgvHUafJ224\"}", "ownKey": "{\"crv\":\"P-256\",\"d\":\"vAjH1BVvW1FlZOrGG9ddHWRWBgLfBUWw7cVkR8CD6Yc\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"MDgHgQ39WuV0zVCjRWYTwEFMFDF3nVNM_Ih2wMO08CE\",\"y\":\"xXjsMqxTlMa0jKK5drAD3eHiEdFQNlUXHfh3bIu43_Y\"}", "ownKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"MDgHgQ39WuV0zVCjRWYTwEFMFDF3nVNM_Ih2wMO08CE\",\"y\":\"xXjsMqxTlMa0jKK5drAD3eHiEdFQNlUXHfh3bIu43_Y\"}" },
    { "address": "wtu1m", "symmetricKey": "{\"alg\":\"A256CBC\",\"ext\":true,\"k\":\"rVHuUy5gNQ4p90OLJwxsuC-mBrC9toxwG1lwoa1RDUI\",\"key_ops\":[\"encrypt\",\"decrypt\"],\"kty\":\"oct\"}", "readKey": "{\"crv\":\"P-256\",\"d\":\"O4GB02JieTybTrwjvgS_E537xnT8s577Z-aHTcL08e4\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"7wWAdTMduuvXuMSVjz-5r--j3TRnPbdXw24_PPaJI5w\",\"y\":\"zRilFviFEzNh2u5aJ2w-bDA7gku45fPdETRRvLALuh8\"}", "readKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"7wWAdTMduuvXuMSVjz-5r--j3TRnPbdXw24_PPaJI5w\",\"y\":\"zRilFviFEzNh2u5aJ2w-bDA7gku45fPdETRRvLALuh8\"}", "writeKey": "{\"crv\":\"P-256\",\"d\":\"aIcGXN2eFOuL_K0jmu-bEC_R8dQitKwk-JARQleFl_w\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"TqP3FJwksWCek3HgevoABAXnxla4QTQOKQbHTDZzLJM\",\"y\":\"177TAIJl9EcjgzyCZd94pgYkj2dRVfEfDgvHUafJ224\"}", "writeKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"TqP3FJwksWCek3HgevoABAXnxla4QTQOKQbHTDZzLJM\",\"y\":\"177TAIJl9EcjgzyCZd94pgYkj2dRVfEfDgvHUafJ224\"}", "ownKey": "{\"crv\":\"P-256\",\"d\":\"vAjH1BVvW1FlZOrGG9ddHWRWBgLfBUWw7cVkR8CD6Yc\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"MDgHgQ39WuV0zVCjRWYTwEFMFDF3nVNM_Ih2wMO08CE\",\"y\":\"xXjsMqxTlMa0jKK5drAD3eHiEdFQNlUXHfh3bIu43_Y\"}", "ownKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"MDgHgQ39WuV0zVCjRWYTwEFMFDF3nVNM_Ih2wMO08CE\",\"y\":\"xXjsMqxTlMa0jKK5drAD3eHiEdFQNlUXHfh3bIu43_Y\"}" },
    { "address": "wf0zs", "symmetricKey": "{\"alg\":\"A256CBC\",\"ext\":true,\"k\":\"rVHuUy5gNQ4p90OLJwxsuC-mBrC9toxwG1lwoa1RDUI\",\"key_ops\":[\"encrypt\",\"decrypt\"],\"kty\":\"oct\"}", "readKey": "{\"crv\":\"P-256\",\"d\":\"O4GB02JieTybTrwjvgS_E537xnT8s577Z-aHTcL08e4\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"7wWAdTMduuvXuMSVjz-5r--j3TRnPbdXw24_PPaJI5w\",\"y\":\"zRilFviFEzNh2u5aJ2w-bDA7gku45fPdETRRvLALuh8\"}", "readKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"7wWAdTMduuvXuMSVjz-5r--j3TRnPbdXw24_PPaJI5w\",\"y\":\"zRilFviFEzNh2u5aJ2w-bDA7gku45fPdETRRvLALuh8\"}", "writeKey": "{\"crv\":\"P-256\",\"d\":\"aIcGXN2eFOuL_K0jmu-bEC_R8dQitKwk-JARQleFl_w\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"TqP3FJwksWCek3HgevoABAXnxla4QTQOKQbHTDZzLJM\",\"y\":\"177TAIJl9EcjgzyCZd94pgYkj2dRVfEfDgvHUafJ224\"}", "writeKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"TqP3FJwksWCek3HgevoABAXnxla4QTQOKQbHTDZzLJM\",\"y\":\"177TAIJl9EcjgzyCZd94pgYkj2dRVfEfDgvHUafJ224\"}", "ownKey": "{\"crv\":\"P-256\",\"d\":\"vAjH1BVvW1FlZOrGG9ddHWRWBgLfBUWw7cVkR8CD6Yc\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"MDgHgQ39WuV0zVCjRWYTwEFMFDF3nVNM_Ih2wMO08CE\",\"y\":\"xXjsMqxTlMa0jKK5drAD3eHiEdFQNlUXHfh3bIu43_Y\"}", "ownKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"MDgHgQ39WuV0zVCjRWYTwEFMFDF3nVNM_Ih2wMO08CE\",\"y\":\"xXjsMqxTlMa0jKK5drAD3eHiEdFQNlUXHfh3bIu43_Y\"}" },
    { "address": "h68pa", "symmetricKey": "{\"alg\":\"A256CBC\",\"ext\":true,\"k\":\"rVHuUy5gNQ4p90OLJwxsuC-mBrC9toxwG1lwoa1RDUI\",\"key_ops\":[\"encrypt\",\"decrypt\"],\"kty\":\"oct\"}", "readKey": "{\"crv\":\"P-256\",\"d\":\"O4GB02JieTybTrwjvgS_E537xnT8s577Z-aHTcL08e4\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"7wWAdTMduuvXuMSVjz-5r--j3TRnPbdXw24_PPaJI5w\",\"y\":\"zRilFviFEzNh2u5aJ2w-bDA7gku45fPdETRRvLALuh8\"}", "readKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"7wWAdTMduuvXuMSVjz-5r--j3TRnPbdXw24_PPaJI5w\",\"y\":\"zRilFviFEzNh2u5aJ2w-bDA7gku45fPdETRRvLALuh8\"}", "writeKey": "{\"crv\":\"P-256\",\"d\":\"aIcGXN2eFOuL_K0jmu-bEC_R8dQitKwk-JARQleFl_w\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"TqP3FJwksWCek3HgevoABAXnxla4QTQOKQbHTDZzLJM\",\"y\":\"177TAIJl9EcjgzyCZd94pgYkj2dRVfEfDgvHUafJ224\"}", "writeKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"TqP3FJwksWCek3HgevoABAXnxla4QTQOKQbHTDZzLJM\",\"y\":\"177TAIJl9EcjgzyCZd94pgYkj2dRVfEfDgvHUafJ224\"}", "ownKey": "{\"crv\":\"P-256\",\"d\":\"vAjH1BVvW1FlZOrGG9ddHWRWBgLfBUWw7cVkR8CD6Yc\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"MDgHgQ39WuV0zVCjRWYTwEFMFDF3nVNM_Ih2wMO08CE\",\"y\":\"xXjsMqxTlMa0jKK5drAD3eHiEdFQNlUXHfh3bIu43_Y\"}", "ownKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"MDgHgQ39WuV0zVCjRWYTwEFMFDF3nVNM_Ih2wMO08CE\",\"y\":\"xXjsMqxTlMa0jKK5drAD3eHiEdFQNlUXHfh3bIu43_Y\"}" },
    { "address": "v05rj", "symmetricKey": "{\"alg\":\"A256CBC\",\"ext\":true,\"k\":\"rVHuUy5gNQ4p90OLJwxsuC-mBrC9toxwG1lwoa1RDUI\",\"key_ops\":[\"encrypt\",\"decrypt\"],\"kty\":\"oct\"}", "readKey": "{\"crv\":\"P-256\",\"d\":\"O4GB02JieTybTrwjvgS_E537xnT8s577Z-aHTcL08e4\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"7wWAdTMduuvXuMSVjz-5r--j3TRnPbdXw24_PPaJI5w\",\"y\":\"zRilFviFEzNh2u5aJ2w-bDA7gku45fPdETRRvLALuh8\"}", "readKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"7wWAdTMduuvXuMSVjz-5r--j3TRnPbdXw24_PPaJI5w\",\"y\":\"zRilFviFEzNh2u5aJ2w-bDA7gku45fPdETRRvLALuh8\"}", "writeKey": "{\"crv\":\"P-256\",\"d\":\"aIcGXN2eFOuL_K0jmu-bEC_R8dQitKwk-JARQleFl_w\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"TqP3FJwksWCek3HgevoABAXnxla4QTQOKQbHTDZzLJM\",\"y\":\"177TAIJl9EcjgzyCZd94pgYkj2dRVfEfDgvHUafJ224\"}", "writeKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"TqP3FJwksWCek3HgevoABAXnxla4QTQOKQbHTDZzLJM\",\"y\":\"177TAIJl9EcjgzyCZd94pgYkj2dRVfEfDgvHUafJ224\"}", "ownKey": "{\"crv\":\"P-256\",\"d\":\"vAjH1BVvW1FlZOrGG9ddHWRWBgLfBUWw7cVkR8CD6Yc\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"MDgHgQ39WuV0zVCjRWYTwEFMFDF3nVNM_Ih2wMO08CE\",\"y\":\"xXjsMqxTlMa0jKK5drAD3eHiEdFQNlUXHfh3bIu43_Y\"}", "ownKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"MDgHgQ39WuV0zVCjRWYTwEFMFDF3nVNM_Ih2wMO08CE\",\"y\":\"xXjsMqxTlMa0jKK5drAD3eHiEdFQNlUXHfh3bIu43_Y\"}" },
    { "address": "o2voy", "symmetricKey": "{\"alg\":\"A256CBC\",\"ext\":true,\"k\":\"rVHuUy5gNQ4p90OLJwxsuC-mBrC9toxwG1lwoa1RDUI\",\"key_ops\":[\"encrypt\",\"decrypt\"],\"kty\":\"oct\"}", "readKey": "{\"crv\":\"P-256\",\"d\":\"O4GB02JieTybTrwjvgS_E537xnT8s577Z-aHTcL08e4\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"7wWAdTMduuvXuMSVjz-5r--j3TRnPbdXw24_PPaJI5w\",\"y\":\"zRilFviFEzNh2u5aJ2w-bDA7gku45fPdETRRvLALuh8\"}", "readKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"7wWAdTMduuvXuMSVjz-5r--j3TRnPbdXw24_PPaJI5w\",\"y\":\"zRilFviFEzNh2u5aJ2w-bDA7gku45fPdETRRvLALuh8\"}", "writeKey": "{\"crv\":\"P-256\",\"d\":\"aIcGXN2eFOuL_K0jmu-bEC_R8dQitKwk-JARQleFl_w\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"TqP3FJwksWCek3HgevoABAXnxla4QTQOKQbHTDZzLJM\",\"y\":\"177TAIJl9EcjgzyCZd94pgYkj2dRVfEfDgvHUafJ224\"}", "writeKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"TqP3FJwksWCek3HgevoABAXnxla4QTQOKQbHTDZzLJM\",\"y\":\"177TAIJl9EcjgzyCZd94pgYkj2dRVfEfDgvHUafJ224\"}", "ownKey": "{\"crv\":\"P-256\",\"d\":\"vAjH1BVvW1FlZOrGG9ddHWRWBgLfBUWw7cVkR8CD6Yc\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"MDgHgQ39WuV0zVCjRWYTwEFMFDF3nVNM_Ih2wMO08CE\",\"y\":\"xXjsMqxTlMa0jKK5drAD3eHiEdFQNlUXHfh3bIu43_Y\"}", "ownKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"MDgHgQ39WuV0zVCjRWYTwEFMFDF3nVNM_Ih2wMO08CE\",\"y\":\"xXjsMqxTlMa0jKK5drAD3eHiEdFQNlUXHfh3bIu43_Y\"}" },
    { "address": "shszz", "symmetricKey": "{\"alg\":\"A256CBC\",\"ext\":true,\"k\":\"rVHuUy5gNQ4p90OLJwxsuC-mBrC9toxwG1lwoa1RDUI\",\"key_ops\":[\"encrypt\",\"decrypt\"],\"kty\":\"oct\"}", "readKey": "{\"crv\":\"P-256\",\"d\":\"O4GB02JieTybTrwjvgS_E537xnT8s577Z-aHTcL08e4\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"7wWAdTMduuvXuMSVjz-5r--j3TRnPbdXw24_PPaJI5w\",\"y\":\"zRilFviFEzNh2u5aJ2w-bDA7gku45fPdETRRvLALuh8\"}", "readKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"7wWAdTMduuvXuMSVjz-5r--j3TRnPbdXw24_PPaJI5w\",\"y\":\"zRilFviFEzNh2u5aJ2w-bDA7gku45fPdETRRvLALuh8\"}", "writeKey": "{\"crv\":\"P-256\",\"d\":\"aIcGXN2eFOuL_K0jmu-bEC_R8dQitKwk-JARQleFl_w\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"TqP3FJwksWCek3HgevoABAXnxla4QTQOKQbHTDZzLJM\",\"y\":\"177TAIJl9EcjgzyCZd94pgYkj2dRVfEfDgvHUafJ224\"}", "writeKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"TqP3FJwksWCek3HgevoABAXnxla4QTQOKQbHTDZzLJM\",\"y\":\"177TAIJl9EcjgzyCZd94pgYkj2dRVfEfDgvHUafJ224\"}", "ownKey": "{\"crv\":\"P-256\",\"d\":\"vAjH1BVvW1FlZOrGG9ddHWRWBgLfBUWw7cVkR8CD6Yc\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"MDgHgQ39WuV0zVCjRWYTwEFMFDF3nVNM_Ih2wMO08CE\",\"y\":\"xXjsMqxTlMa0jKK5drAD3eHiEdFQNlUXHfh3bIu43_Y\"}", "ownKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"MDgHgQ39WuV0zVCjRWYTwEFMFDF3nVNM_Ih2wMO08CE\",\"y\":\"xXjsMqxTlMa0jKK5drAD3eHiEdFQNlUXHfh3bIu43_Y\"}" },
    { "address": "bx83v", "symmetricKey": "{\"alg\":\"A256CBC\",\"ext\":true,\"k\":\"rVHuUy5gNQ4p90OLJwxsuC-mBrC9toxwG1lwoa1RDUI\",\"key_ops\":[\"encrypt\",\"decrypt\"],\"kty\":\"oct\"}", "readKey": "{\"crv\":\"P-256\",\"d\":\"O4GB02JieTybTrwjvgS_E537xnT8s577Z-aHTcL08e4\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"7wWAdTMduuvXuMSVjz-5r--j3TRnPbdXw24_PPaJI5w\",\"y\":\"zRilFviFEzNh2u5aJ2w-bDA7gku45fPdETRRvLALuh8\"}", "readKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"7wWAdTMduuvXuMSVjz-5r--j3TRnPbdXw24_PPaJI5w\",\"y\":\"zRilFviFEzNh2u5aJ2w-bDA7gku45fPdETRRvLALuh8\"}", "writeKey": "{\"crv\":\"P-256\",\"d\":\"aIcGXN2eFOuL_K0jmu-bEC_R8dQitKwk-JARQleFl_w\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"TqP3FJwksWCek3HgevoABAXnxla4QTQOKQbHTDZzLJM\",\"y\":\"177TAIJl9EcjgzyCZd94pgYkj2dRVfEfDgvHUafJ224\"}", "writeKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"TqP3FJwksWCek3HgevoABAXnxla4QTQOKQbHTDZzLJM\",\"y\":\"177TAIJl9EcjgzyCZd94pgYkj2dRVfEfDgvHUafJ224\"}", "ownKey": "{\"crv\":\"P-256\",\"d\":\"vAjH1BVvW1FlZOrGG9ddHWRWBgLfBUWw7cVkR8CD6Yc\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"MDgHgQ39WuV0zVCjRWYTwEFMFDF3nVNM_Ih2wMO08CE\",\"y\":\"xXjsMqxTlMa0jKK5drAD3eHiEdFQNlUXHfh3bIu43_Y\"}", "ownKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"MDgHgQ39WuV0zVCjRWYTwEFMFDF3nVNM_Ih2wMO08CE\",\"y\":\"xXjsMqxTlMa0jKK5drAD3eHiEdFQNlUXHfh3bIu43_Y\"}" },
    { "address": "jkjr7", "symmetricKey": "{\"alg\":\"A256CBC\",\"ext\":true,\"k\":\"rVHuUy5gNQ4p90OLJwxsuC-mBrC9toxwG1lwoa1RDUI\",\"key_ops\":[\"encrypt\",\"decrypt\"],\"kty\":\"oct\"}", "readKey": "{\"crv\":\"P-256\",\"d\":\"O4GB02JieTybTrwjvgS_E537xnT8s577Z-aHTcL08e4\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"7wWAdTMduuvXuMSVjz-5r--j3TRnPbdXw24_PPaJI5w\",\"y\":\"zRilFviFEzNh2u5aJ2w-bDA7gku45fPdETRRvLALuh8\"}", "readKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"7wWAdTMduuvXuMSVjz-5r--j3TRnPbdXw24_PPaJI5w\",\"y\":\"zRilFviFEzNh2u5aJ2w-bDA7gku45fPdETRRvLALuh8\"}", "writeKey": "{\"crv\":\"P-256\",\"d\":\"aIcGXN2eFOuL_K0jmu-bEC_R8dQitKwk-JARQleFl_w\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"TqP3FJwksWCek3HgevoABAXnxla4QTQOKQbHTDZzLJM\",\"y\":\"177TAIJl9EcjgzyCZd94pgYkj2dRVfEfDgvHUafJ224\"}", "writeKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"TqP3FJwksWCek3HgevoABAXnxla4QTQOKQbHTDZzLJM\",\"y\":\"177TAIJl9EcjgzyCZd94pgYkj2dRVfEfDgvHUafJ224\"}", "ownKey": "{\"crv\":\"P-256\",\"d\":\"vAjH1BVvW1FlZOrGG9ddHWRWBgLfBUWw7cVkR8CD6Yc\",\"ext\":true,\"key_ops\":[\"sign\"],\"kty\":\"EC\",\"x\":\"MDgHgQ39WuV0zVCjRWYTwEFMFDF3nVNM_Ih2wMO08CE\",\"y\":\"xXjsMqxTlMa0jKK5drAD3eHiEdFQNlUXHfh3bIu43_Y\"}", "ownKeyPublic": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"MDgHgQ39WuV0zVCjRWYTwEFMFDF3nVNM_Ih2wMO08CE\",\"y\":\"xXjsMqxTlMa0jKK5drAD3eHiEdFQNlUXHfh3bIu43_Y\"}" },
]

/*
 * Fills table of known addresses with keys
 */
function fillAddressTable() {
    var addressesElement = document.getElementById("serverAddresses");
    var temp = '<table class="table table-bordered table-striped" style="table-layout: fixed;">' +
        '<thead>' +
        '<tr><th style="width:5%;" >#</th><th style="width:15%;">Address</th><th style="width:20%;">symmetric key</th><th style="width:20%;">read key</th><th style="width:20%;">write key</th><th style="width:20%;">own key</th></tr>' +
        '</thead>';
    for (var i = 0; i < knownAddresses.length; i++) {
        temp += '<tr>';
        temp += '<td>' + (i + 1) +
            '</td><td style="word-wrap: break-word; overflow-wrap: break-word;">' + knownAddresses[i].address +
            '</td><td style="word-wrap: break-word; overflow-wrap: break-word;">' + knownAddresses[i].symmetricKey +
            '</td><td style="word-wrap: break-word; overflow-wrap: break-word;">' + knownAddresses[i].readKey +
            '</td><td style="word-wrap: break-word; overflow-wrap: break-word;">' + knownAddresses[i].writeKey +
            '</td><td style="word-wrap: break-word; overflow-wrap: break-word;">' + knownAddresses[i].readKey + '</td>'
        temp += '</tr>';
    }
    temp += '</table>';

    addressesElement.innerHTML = temp;
}

function fillMixAddresses() {
    document.getElementById("mixAddressToInput1").value = knownAddresses[0].address;
    document.getElementById("mixAddressToInput2").value = knownAddresses[1].address;
    document.getElementById("mixAddressToInput3").value = knownAddresses[2].address;
    document.getElementById("mixAddressFromInput1").value = knownAddresses[3].address;
    document.getElementById("mixAddressFromInput2").value = knownAddresses[4].address;
    document.getElementById("mixAddressFromInput3").value = knownAddresses[5].address;
    document.getElementById("mixAddressMessageInput").value = Date.now();
}

function stringToArrayBuffer(string) {
    "use strict";
    if (string == null || !(typeof string == "string" || string instanceof ArrayBuffer)) {
        return new ArrayBuffer(0);
    }
    if (typeof string == "string" && string.indexOf("FromArrayBuffer_") == 0) {
        string = string.substring(16);
    }
    if (string instanceof ArrayBuffer) {
        return string;
    }
    var buf = new ArrayBuffer(string.length);
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = string.length; i < strLen; i++) {
        bufView[i] = string.charCodeAt(i);
    }
    return buf;
}
function toBuffer(data) {
    "use strict";
    var dataBuffer = null;
    if (typeof data == "string") {
        dataBuffer = stringToArrayBuffer(data);
    } else if (data instanceof ArrayBuffer || data instanceof Uint8Array) {
        dataBuffer = data;
    } else if (typeof data == "object") {
        dataBuffer = stringToArrayBuffer(JSON.stringify(data));
    }
    return dataBuffer;
}

function arrayBufferToString(buffer) {
    "use strict";
    if (buffer == null) {
        return "";
    }
    if (typeof buffer == "string") {
        return buffer;
    }

    if (buffer.byteLength > 100000) {
        var temparray = [];
        var i, j, chunk = 100000;
        for (i = 0, j = buffer.byteLength; i < j; i += chunk) {
            temparray.push(String.fromCharCode.apply(null, new Uint8Array(buffer.slice(i, i + chunk))));
        }
        return temparray.join('');
    }

    return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

/*
 * Exports a key as JSON Web Key
 */
function exportKey(key) {
    return window.crypto.subtle.exportKey("jwk", key).then(function (exportKey) {
        return exportKey;
    });
}

/*
 * Imports an ECDSA private key (exchanged in person or from predefined addresses)
 */
function importECDSAPrivateKey(key) {
    return window.crypto.subtle.importKey(
        "jwk",
        key,
        {
            name: "ECDSA",
            namedCurve: "P-256",
        },
        true,
        ["sign"]
    )
        .then(function (privateKey) {
            return privateKey;
        })
        .catch(function (err) {
            console.error(err);
        });
}

/*
 * Imports an AES key (exchanged in person or from predefined addresses)
 */
function importAESKey(key) {
    return window.crypto.subtle.importKey(
        "jwk",
        key,
        {
            name: "AES-CBC",
        },
        true,
        ["encrypt", "decrypt"]
    )
        .then(function (key) {
            return key;
        })
        .catch(function (err) {
            console.error(err);
        });
}

/*
 * Encrypts a message with the symmetric AES encryption. Returns the ciphertext and IV
 */
function encryptAESMessage(key, data) {
    var iv = window.crypto.getRandomValues(new Uint8Array(16));
    return window.crypto.subtle.encrypt(
        {
            name: "AES-CBC",
            //Don't re-use initialization vectors!
            //Always generate a new iv every time your encrypt!
            iv: iv
        },
        key, //from generateKey or importKey above
        data //ArrayBuffer of data you want to encrypt
    )
        .then(function (ciphertext) {
            return { ciphertext: ciphertext, iv: iv };
        })
        .catch(function (err) {
            console.error(err);
        });
}

function decryptAESMessage(key, data, iv) {
    return window.crypto.subtle.decrypt(
        {
            name: "AES-CBC",
            iv: iv,
        },
        key,
        data
    )
        .then(function (decrypted) {
            return decrypted;
        })
        .catch(function (err) {
            return err;
        });
}

/*
 * Generates an AES key
 */
function generateAesKey() {
    return window.crypto.subtle.generateKey(
        {
            name: "AES-CBC",
            length: 256,
        },
        true,
        ["encrypt", "decrypt"]
    )
        .then(function (key) {
            return key;
        }).catch(function (err) {
            console.error(err);
        });
}

function generateRsaKey() {
    return window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 4096,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            hash: { name: "SHA-256" },
        },
        true,
        ["encrypt", "decrypt"]
    )
        .then(function (key) {
            return key;
        }).catch(function (err) {
            console.error(err);
        });
}

function importRsaPublicKey(key) {
    return window.crypto.subtle.importKey(
        "jwk",
        key,
        {
            name: "RSA-OAEP",
            hash: { name: "SHA-256" },
        },
        true,
        ["encrypt"]
    )
        .then(function (publicKey) {
            return publicKey;
        })
        .catch(function (err) {
            console.error(err);
        });
}

function importRsaPrivateKey(key) {
    return window.crypto.subtle.importKey(
        "jwk",
        key,
        {
            name: "RSA-OAEP",
            hash: { name: "SHA-256" },
        },
        true,
        ["decrypt"]
    )
        .then(function (privateKey) {
            return privateKey;
        })
        .catch(function (err) {
            console.error(err);
        });
}

function encryptRsaMessage(message, key) {
    return window.crypto.subtle.encrypt(
        {
            name: "RSA-OAEP",
        },
        key,
        message
    )
        .then(function (encrypted) {
            return arrayBufferToString(encrypted);
        })
        .catch(function (err) {
            console.error(err);
        });
}

function decryptRsaMessage(message, key) {
    return window.crypto.subtle.decrypt(
        {
            name: "RSA-OAEP",
        },
        key,
        message
    )
        .then(function (decrypted) {
            return arrayBufferToString(decrypted);
        })
        .catch(function (err) {
            console.error(err);
        });
}


/*
 * Generates a key-pair for ECDSA signatures
 */
function generateSignatureKey() {
    return window.crypto.subtle.generateKey(
        {
            name: "ECDSA",
            namedCurve: "P-256"
        },
        true,
        ["sign", "verify"]
    )
        .then(function (key) {
            return key;
        }).catch(function (err) {
            console.error(err);
        });
}

/*
 * Signs a message with a given key
 */
function signMessage(privateKey, toSign) {
    return window.crypto.subtle.sign(
        {
            name: "ECDSA",
            hash: { name: "SHA-256" }
        },
        privateKey,
        toSign
    )
        .then(function (signature) {
            return signature;
        }).catch(function (err) {
            console.error(err);
        });
}


/*
 * Creates 4 keys: AES + read, write, own
 * Creates address with asymmetric keys
 * Writes address and keys to console
 */
function createAddress() {
    var keyPromises = [generateAesKey(), generateSignatureKey(), generateSignatureKey(), generateSignatureKey()];
    Promise.all(keyPromises).then(function (keys) {
        exportPromises = [
            exportKey(keys[0]), //AES key   0
            exportKey(keys[1].publicKey), //read public key   1
            exportKey(keys[1].privateKey), //read private key   2
            exportKey(keys[2].publicKey), //write public key   3
            exportKey(keys[2].privateKey), //write private key   4     
            exportKey(keys[3].publicKey), //modify public key   5
            exportKey(keys[3].privateKey) //modify private key   6
        ];
        Promise.all(exportPromises).then(function (exportedKeys) {

            console.log("Symmetric key:");
            console.log(JSON.stringify(exportedKeys[0]));

            console.log("Read key:");
            console.log(JSON.stringify(exportedKeys[2]));

            console.log("Write key:");
            console.log(JSON.stringify(exportedKeys[4]));

            console.log("Own key:");
            console.log(JSON.stringify(exportedKeys[6]));
            var request = new XMLHttpRequest();
            request.open("POST", "api/ConcealedAddresses/createAddress", true);

            var sendObject = {
                readKey: JSON.stringify(exportedKeys[1]),
                writeKey: JSON.stringify(exportedKeys[3]),
                ownKey: JSON.stringify(exportedKeys[5]),
            };

            request.setRequestHeader('Content-Type', 'application/json');
            request.addEventListener('load', function (event) {
                if (request.status >= 200 && request.status < 300) {
                    var parsed = JSON.parse(request.responseText);
                    console.log("Address at server:");
                    console.log(parsed.address);

                    var tableObject = {
                        address: parsed.address,
                        symmetricKey: JSON.stringify(exportedKeys[0]),
                        readKey: JSON.stringify(exportedKeys[2]),
                        readKeyPublic: JSON.stringify(exportedKeys[1]),
                        writeKey: JSON.stringify(exportedKeys[4]),
                        writeKeyPublic: JSON.stringify(exportedKeys[3]),
                        ownKey: JSON.stringify(exportedKeys[6]),
                        ownKeyPublic: JSON.stringify(exportedKeys[5]),
                    };

                    console.log("Entry for table:")
                    console.log(JSON.stringify(tableObject));

                } else {
                    console.warn(request.statusText, request.responseText);
                }
            });
            request.send(JSON.stringify(sendObject));
        });
    });
}

/*
 * Finds a key of specified type in the table of known keys
 */
function findKey(address, type) {
    for (var i = 0; i < knownAddresses.length; i++) {
        if (knownAddresses[i].address == address) {
            switch (type) {
                case "readKey":
                    return knownAddresses[i].readKey;
                case "writeKey":
                    return knownAddresses[i].writeKey;
                case "ownKey":
                    return knownAddresses[i].ownKey;
                default:
                    return knownAddresses[i].symmetricKey;
            }
        }
    }
    return;
}

function findKeys(addresses, type) {
    var keys = [];
    for (var i = 0; i < addresses.length; i++) {
        keys.push(findKey(addresses[i], type));
    }
    return keys;
}


/*
 * Reads messages from an address. Uses known keys
 */
function readFromAddress(addressParam, handleAnswer = false) {
    var timestamp = Date.now();
    var address = document.getElementById("readAddressInput").value;
    if (addressParam != null) {
        address = addressParam;
    }

    var toSign = address + "." + timestamp + "..";
    var readKey = findKey(address, "readKey");

    importECDSAPrivateKey(JSON.parse(readKey)).then(function (importedKey) {
        signMessage(importedKey, stringToArrayBuffer(toSign)).then(function (signature) {
            var request = new XMLHttpRequest();

            var readFromAddressObject = {
                address: address,
                timestamp: JSON.stringify(timestamp),
                targetKey: arrayBufferToString(signature),
                ciphertext: "",
                iv: ""
            };
            readMessageTimes_onlysign.push(Date.now() - timestamp);

            request.open("POST", "api/ConcealedAddresses/readMessages");
            request.setRequestHeader('Content-Type', 'application/json');
            request.addEventListener('load', function (event) {
                if (request.status >= 200 && request.status < 300) {
                    readMessageTimes.push(Date.now() - timestamp);
                    if (handleAnswer && request.responseText == "[]") {
                        pollAddressTimeout(addressParam);
                    }
                    if (handleAnswer && request.responseText != "[]") {
                        var messages = JSON.parse(request.responseText);
                        for (var i = 0; i < messages.length; i++) {
                            handleMessage(messages[i], address);
                        }
                    }
                    if (request.responseText != "[]") {
                        var messages = JSON.parse(request.responseText);
                        var readTimeStamp = Date.now();
                        var aesKey = findKey(address, "encrypt");
                        importAESKey(JSON.parse(aesKey)).then(function (key) {
                            for (var i = 0; i < messages.length; i++) {
                                decryptAESMessage(key, stringToArrayBuffer(messages[i].content), stringToArrayBuffer(messages[i].iv)).then(function (plaintext) {
                                    decryptionTimes.push(Date.now() - readTimeStamp);
                                    console.log(arrayBufferToString(plaintext));
                                    if (readFromAddressCount > 0) {
                                        readMultiple();
                                    } else {
                                        console.log("read multiple finished");
                                    }
                                });
                            }
                        });
                    }
                } else {
                    console.warn(request.statusText, request.responseText);
                }
            });
            request.send(JSON.stringify(readFromAddressObject));
        });
    });
}

function readProfileMessagesFromAddress(address, key, fakeCiphertext = null, fakeIV = null) {
    var timestamp = Date.now();
    var toSign = address + "." + timestamp + "..";

    return signMessage(key, stringToArrayBuffer(toSign)).then(function (signature) {
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();

            var readFromAddressObject = {
                address: address,
                timestamp: JSON.stringify(timestamp),
                targetKey: arrayBufferToString(signature),
                //ciphertext: JSON.stringify({ Name : "test" }),
                ciphertext: "",
                iv: ""
            };

            if (fakeCiphertext != null) {
                readFromAddressObject.ciphertext = fakeCiphertext;
            }
            if (fakeIV != null) {
                readFromAddressObject.iv = fakeIV;
            }

            request.open("POST", "api/ConcealedAddresses/readMessages");
            request.setRequestHeader('Content-Type', 'application/json');
            request.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(request.response);
                } else {
                    reject({
                        status: this.status,
                        statusText: request.statusText
                    });
                }
            };
            request.onerror = function () {
                reject({
                    status: this.status,
                    statusText: request.statusText
                });
            };
            request.send(JSON.stringify(readFromAddressObject));
        });
    });
}


var deleteMessagesList = [];
function deleteMessages() {
    var address = document.getElementById("deleteAddressInput").value;
    var min = parseInt(document.getElementById("deleteAddressInputMin").value);
    var max = parseInt(document.getElementById("deleteAddressInputMax").value);
    for (var i = min; i <= max; i++) {
        deleteMessagesList.push(i);
    }
    deleteMessagesFromList(address);
}
function deleteMessagesFromList(address) {
    if (deleteMessagesList.length > 0) {
        removeMessage(address, deleteMessagesList.pop(), true);
    } else {
        console.log("deleteMessages finished:");
        console.log(JSON.stringify(deleteMessageTimes));
    }
}
var readFromAddressCount = 0;
function readMultiple(initialize = false) {
    if (initialize) {
        readFromAddressCount = 200;
    }
    var address = document.getElementById("readAddressInput").value;
    if (readFromAddressCount > 0) {
        readFromAddressCount--;
        readFromAddress(address, false);
    } else {
        console.log("readMultiple finished:");
        console.log(JSON.stringify(readMessageTimes));
    }
}
var writeToAddressCount = 0;
function writeMultiple(initialize = false) {
    if (initialize) {
        writeToAddressCount = 10;
    }
    var address = document.getElementById("writeAddressInput").value;
    if (address == "") {
        return;
    }
    var length = parseInt(document.getElementById("writeAddressLengthInput").value);
    var message = "";
    if (length < 5000) {
        message = arrayBufferToString(window.crypto.getRandomValues(new Uint8Array(length)));
    } else {
        var count = Math.ceil(length / 3100);
        var messageArray = [];
        for (var i = 0; i < count; i++) {
            messageArray.push(modifyLoremIpsum());
        }
        message = messageArray.join('');
    }
    if (writeToAddressCount > 0) {
        writeToAddressCount--;
        writeToAddress(address, message, count);
    } else {
        console.log("writeMultiple finished:");
        console.log(JSON.stringify(writeToAddressTimes));
    }
}

function modifyLoremIpsum() {
    var str = loremIpsum3100;
    var shift = getRandomInt(50);
    var charcode = 0;
    var result = [];
    //minimum charcode = 32 -> space
    //maximum charcode = 126 -> ~
    for (var i = 0; i < str.length; i++) {
        charcode = ((str[i].charCodeAt()) + shift) % 94 + 32;
        result.push(String.fromCharCode(charcode));
    }
    return result.join('');
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/*
 * Writes a message to an address. Uses known keys
 */
function writeToAddress(addressParam, messageParam) {
    var timestamp = Date.now();
    var address = document.getElementById("writeAddressInput").value;
    if (addressParam != null) {
        var message = addressParam;
    }
    var message = document.getElementById("writeAddressMessageInput").value;
    if (messageParam != null) {
        var message = messageParam;
    }

    var encryptKey = findKey(address, "encrypt");
    var writeKey = findKey(address, "writeKey");
    var importKeys = [importAESKey(JSON.parse(encryptKey)), importECDSAPrivateKey(JSON.parse(writeKey))];

    Promise.all(importKeys).then(function (imported) {
        encryptAESMessage(imported[0], stringToArrayBuffer(message)).then(function (ciphertextObject) {
            var ct = arrayBufferToString(ciphertextObject.ciphertext);
            var iv = arrayBufferToString(ciphertextObject.iv);
            var toSign = address + "." + timestamp + "." +
                ct + "." + iv;

            signMessage(imported[1], stringToArrayBuffer(toSign)).then(function (signature) {
                writeToAddressObject = {
                    address: address,
                    timestamp: JSON.stringify(timestamp),
                    targetKey: arrayBufferToString(signature),
                    ciphertext: ct,
                    iv: iv
                };
                writeToAddressTimes_onlysign.push(Date.now() - timestamp);
                var request = new XMLHttpRequest();
                request.open("POST", "api/ConcealedAddresses/writeMessage");
                request.setRequestHeader('Content-Type', 'application/json');
                request.addEventListener('load', function (event) {
                    if (request.status >= 200 && request.status < 300) {
                        writeToAddressTimes.push(Date.now() - timestamp);
                        console.log(request.responseText);

                        if (writeToAddressCount > 0) {
                            writeMultiple();
                        } else {
                            console.log("write multiple finished");
                        }
                    } else {
                        console.warn(request.statusText, request.responseText);
                    }
                });
                request.send(JSON.stringify(writeToAddressObject));
            });
        });
    });
}



function writeToAddressWithoutEncryption(address, message, writeKey) {
    var timestamp = Date.now();

    importECDSAPrivateKey(JSON.parse(writeKey)).then(function (ecdsaKey) {
        var ct = arrayBufferToString(message.ciphertext);
        var iv = arrayBufferToString(message.iv);
        var toSign = address + "." + timestamp + "." +
            ct + "." + iv;

        signMessage(ecdsaKey, stringToArrayBuffer(toSign)).then(function (signature) {
            writeToAddressObject = {
                address: address,
                timestamp: JSON.stringify(timestamp),
                targetKey: arrayBufferToString(signature),
                ciphertext: arrayBufferToString(message.ciphertext),
                iv: arrayBufferToString(message.iv)
            };

            var request = new XMLHttpRequest();
            request.open("POST", "api/ConcealedAddresses/writeMessage");
            request.setRequestHeader('Content-Type', 'application/json');
            request.addEventListener('load', function (event) {
                if (request.status >= 200 && request.status < 300) {
                    console.log(request.responseText);
                } else {
                    console.warn(request.statusText, request.responseText);
                }
            });
            request.send(JSON.stringify(writeToAddressObject));
        });
    });
}

function pollAddresses(addresses) {
    var uniqueAddresses = [];
    for (var i = 0; i < addresses.length; i++) {
        if (uniqueAddresses.indexOf(addresses[i]) == -1) {
            pollAddressTimeout(addresses[i]);
            uniqueAddresses.push(addresses[i]);
        }
    }
}


function mixOverAddresses() {
    var ts = Date.now();
    var addresses = [
        document.getElementById("mixAddressFromInput3").value,
        document.getElementById("mixAddressFromInput2").value,
        document.getElementById("mixAddressFromInput1").value,
        document.getElementById("mixAddressToInput3").value,
        document.getElementById("mixAddressToInput2").value,
        document.getElementById("mixAddressToInput1").value
    ];
    pollAddresses(addresses);

    var message = document.getElementById("mixAddressMessageInput").value;

    var aesKeys = findKeys(addresses, "encrypt");
    var writeKeys = findKeys(addresses, "writeKey");

    //this is the first messageObject (mO), it has no forwardAddresses, etc. because it is the last message -> sent back to the initiator of the mix message
    var messageObject = {
        forwardAddresses: [],
        forwardAddressesIVs: [],
        forwardKeys: [],
        forwardKeyIVs: [],
        expectsResponses: [],
        expectsResponsesIVs: [],
        content: "",
        iv: "",
        responseAESKey: "",
    };

    encryptMessageObject(aesKeys[0], messageObject).then(function (messageObject1) { //the contents of the first mO are encrypted using the last address keys
        messageObject1.forwardAddresses.push(addresses[0]);
        messageObject1.forwardKeys.push(writeKeys[0]);
        messageObject1.expectsResponses.push(false);
        encryptMessageObject(aesKeys[1], messageObject1).then(function (messageObject2) {
            messageObject2.forwardAddresses.push(addresses[1]);
            messageObject2.forwardKeys.push(writeKeys[1]);
            messageObject2.expectsResponses.push(false);
            encryptMessageObject(aesKeys[2], messageObject2).then(function (messageObject3) {//this is the message received at the destination
                var rak = findKey(addresses[0], "encrypt");
                messageObject3.forwardAddresses.push(addresses[2]);
                messageObject3.forwardKeys.push(writeKeys[2]);
                messageObject3.expectsResponses.push(true);
                messageObject3.content = message;
                messageObject3.responseAESKey = rak
                encryptMessageObject(aesKeys[3], messageObject3, true).then(function (messageObject4) {
                    messageObject4.forwardAddresses.push(addresses[3]);
                    messageObject4.forwardKeys.push(writeKeys[3]);
                    messageObject4.expectsResponses.push(false);
                    encryptMessageObject(aesKeys[4], messageObject4).then(function (messageObject5) {
                        messageObject5.forwardAddresses.push(addresses[4]);
                        messageObject5.forwardKeys.push(writeKeys[4]);
                        messageObject5.expectsResponses.push(false);

                        importAESKey(JSON.parse(aesKeys[5])).then(function (key) {//this message finally is sent to the last address
                            encryptMessageObject(aesKeys[5], messageObject5).then(function (messageObject6) {
                                encryptAESMessage(key, stringToArrayBuffer(JSON.stringify(messageObject6))).then(function (cipher) {
                                    writeToAddressWithoutEncryption(addresses[5], cipher, writeKeys[5]);
                                    mixMessageTimes.push((Date.now() - ts));
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function encryptMessageObject(keyString, messageObject, encryptAesKey = false) {
    return importAESKey(JSON.parse(keyString)).then(function (key) {
        var forwardAddressesBuffer = stringToArrayBuffer(JSON.stringify(messageObject.forwardAddresses));
        var forwardKeysBuffer = stringToArrayBuffer(JSON.stringify(messageObject.forwardKeys));
        var expectsResponseBuffer = stringToArrayBuffer(JSON.stringify(messageObject.expectsResponses));
        var encryptList = [encryptAESMessage(key, forwardAddressesBuffer), encryptAESMessage(key, forwardKeysBuffer), encryptAESMessage(key, expectsResponseBuffer)];
        if (encryptAesKey) {
            encryptList.push(encryptAESMessage(key, stringToArrayBuffer(messageObject.responseAESKey))); //is stringified
            encryptList.push(encryptAESMessage(key, stringToArrayBuffer(messageObject.content))); //is string
        }

        return Promise.all(encryptList).then(function (values) {
            messageObject.forwardAddresses = [arrayBufferToString(values[0].ciphertext)];
            messageObject.forwardKeys = [arrayBufferToString(values[1].ciphertext)];
            messageObject.expectsResponses = [arrayBufferToString(values[2].ciphertext)];

            messageObject.forwardAddressesIVs.push(arrayBufferToString(values[0].iv));
            messageObject.forwardKeyIVs.push(arrayBufferToString(values[1].iv));
            messageObject.expectsResponsesIVs.push(arrayBufferToString(values[2].iv));

            if (encryptAesKey) {
                messageObject.responseAESKey = arrayBufferToString(values[3].ciphertext);
                messageObject.responseAESIV = arrayBufferToString(values[3].iv);
                messageObject.content = arrayBufferToString(values[4].ciphertext);
                messageObject.iv = arrayBufferToString(values[4].iv);
            }
            return messageObject;
        });
    });
}

function pollAddressTimeout(address) {
    setTimeout(function (address) { readFromAddress(address, true); }, 1000, address);
}


/*
 * messageObject= {
 *   forwardAddresses: {address, {address, {address, {...}}}}
 *   forwardAddressesIVs: iv, iv, iv, ... (more than needed)
 *   forwardKeys: {key, {key, {key, {...}}}}
 *   forwardKeyIVs: iv, iv, iv, ... (more than needed)
 *   ciphertext:
 *   iv:
 *   expectsResponse:
 *   responseAESKey:
 * }
 */
function handleMessage(message, address) {
    var encryptKey = findKey(address, "encrypt");

    importAESKey(JSON.parse(encryptKey)).then(function (key) {
        decryptAESMessage(key, stringToArrayBuffer(message.content), stringToArrayBuffer(message.iv)).then(function (plaintext) {
            var messageObject = JSON.parse(arrayBufferToString(plaintext));
            if (messageObject.forwardAddresses.length == 0) {
                //do stuff
                //read, save
                console.log("message has no forward address");
                console.log("address: " + address);
                console.log("message: " + JSON.stringify(message));
                console.log(messageObject.content)
                removeMessage(address, message.id);
                pollAddressTimeout(address);
            } else {


                var expectsResponse = messageObject.expectsResponses.pop();
                var erIV = messageObject.expectsResponsesIVs.pop();

                var forwardAddress = messageObject.forwardAddresses.pop();
                var faIV = messageObject.forwardAddressesIVs.pop();

                var forwardKey = messageObject.forwardKeys.pop();
                var fkIV = messageObject.forwardKeyIVs.pop();




                Promise.all([
                    decryptAESMessage(key, stringToArrayBuffer(expectsResponse), stringToArrayBuffer(erIV)),
                    decryptAESMessage(key, stringToArrayBuffer(forwardAddress), stringToArrayBuffer(faIV)),
                    decryptAESMessage(key, stringToArrayBuffer(forwardKey), stringToArrayBuffer(fkIV))]).then(function (eRfAfK) {
                        var expectsResponses = JSON.parse(arrayBufferToString(eRfAfK[0]));
                        var forwardAddresses = JSON.parse(arrayBufferToString(eRfAfK[1]));
                        var forwardKeys = JSON.parse(arrayBufferToString(eRfAfK[2]));

                        var expectsResponse = expectsResponses.pop();
                        var forwardAddress = forwardAddresses.pop();
                        var forwardKey = forwardKeys.pop();

                        messageObject.expectsResponses = expectsResponses;
                        messageObject.forwardAddresses = forwardAddresses;
                        messageObject.forwardKeys = forwardKeys;


                        var aesForwardKey = findKey(forwardAddress, "encrypt");

                        if (expectsResponse) {
                            console.log("message expects a response");
                            console.log("address: " + address);
                            console.log("message: " + JSON.stringify(message));
                            decryptAESMessage(key, stringToArrayBuffer(messageObject.content), stringToArrayBuffer(messageObject.iv)).then(function (plaintext) {
                                var responseMessage = stringToArrayBuffer("Response to: " + arrayBufferToString(plaintext) + "." + Date.now());
                                exportKey(key).then(function (exported) {
                                    var sc = 1904;
                                    decryptAESMessage(key, stringToArrayBuffer(messageObject.responseAESKey), stringToArrayBuffer(messageObject.responseAESIV)).then(function (aeskeyPlain) {
                                        importAESKey(JSON.parse(arrayBufferToString(aeskeyPlain))).then(function (aesKey) {
                                            encryptAESMessage(aesKey, responseMessage).then(function (cipher) {
                                                messageObject.content = arrayBufferToString(cipher.ciphertext);
                                                messageObject.iv = arrayBufferToString(cipher.iv);
                                                importAESKey(JSON.parse(aesForwardKey)).then(function (key) {
                                                    encryptAESMessage(key, stringToArrayBuffer(JSON.stringify(messageObject))).then(function (cipher) {
                                                        writeToAddressWithoutEncryption(forwardAddress, cipher, forwardKey);
                                                        removeMessage(address, message.id);
                                                        pollAddressTimeout(address);
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });

                            });
                        } else {
                            if (aesForwardKey != undefined) {
                                importAESKey(JSON.parse(aesForwardKey)).then(function (key) {
                                    encryptAESMessage(key, stringToArrayBuffer(JSON.stringify(messageObject))).then(function (cipher) {
                                        console.log("message was forwarded");
                                        console.log("address: " + address);
                                        console.log("forwardAddress: " + forwardAddress);
                                        console.log("message: " + JSON.stringify(message));
                                        writeToAddressWithoutEncryption(forwardAddress, cipher, forwardKey);
                                        removeMessage(address, message.id);
                                        pollAddressTimeout(address);
                                    });
                                });
                            } else {
                                var aesKey = findKey(address, "encrypt");
                                importAESKey(JSON.parse(aesKey)).then(function (key) {
                                    decryptAESMessage(key, stringToArrayBuffer(message.content), stringToArrayBuffer(message.iv)).then(function (plaintext) {
                                        var ptOject = JSON.parse(arrayBufferToString(plaintext));
                                        decryptAESMessage(key, stringToArrayBuffer(ptOject.content), stringToArrayBuffer(ptOject.iv)).then(function (plaintext) {
                                            console.log("message has no aes forward key");
                                            console.log("address: " + address);
                                            console.log("plaintext: " + arrayBufferToString(plaintext));
                                        });
                                    });
                                });

                            }

                        }
                    });
            }
        });
    });
}

function removeMessage(address, id, deleteMultiple = false) {
    var signKey = findKey(address, "ownKey");
    var timestamp = Date.now();
    importECDSAPrivateKey(JSON.parse(signKey)).then(function (importedKey) {



        var toSign = address + "." + id + "." + timestamp;

        signMessage(importedKey, stringToArrayBuffer(toSign)).then(function (signature) {
            var request = new XMLHttpRequest();

            var deleteMessageObject = {
                address: address,
                messageId: id,
                timestamp: timestamp + "",
                signature: arrayBufferToString(signature)
            };
            deleteMessageTimes_onlysign.push(Date.now() - timestamp);


            request.open("POST", "api/ConcealedAddresses/deleteMessage");
            request.setRequestHeader('Content-Type', 'application/json');
            request.addEventListener('load', function (event) {
                if (request.status >= 200 && request.status < 300) {
                    deleteMessageTimes.push(Date.now() - timestamp);
                    console.log(request.responseText);
                    if (deleteMultiple) {
                        deleteMessagesFromList(address);
                    }
                } else {
                    console.warn(request.statusText, request.responseText);
                }
            });
            request.send(JSON.stringify(deleteMessageObject));
        });


    });

}

function generateExportRsaKeyPair() {
    generateRsaKey().then(function (key) {
        exportKey(key.publicKey).then(function (jwk) {
            console.log("public:");
            console.log(JSON.stringify(jwk));
        });
        exportKey(key.privateKey).then(function (jwk) {
            console.log("private:");
            console.log(JSON.stringify(jwk));
        });
    });
}

function helperFunction() {
    /*var userPublicKey = { "alg": "RSA-OAEP-256", "e": "AQAB", "ext": true, "key_ops": ["encrypt"], "kty": "RSA", "n": "omQbzvHtbEEodatYfUHGHMhB5a6a_A0mto9nxpJgRh-qIt3S45wdglr6ULBpy0A8LaKgl2g-J0Q-TxRPvtIIfrziS_UGMJi3hsdOtCftvnEQZVzLZHdj9JPMMKXIL0BrDR9K7a2jGMsfGf4dcn2urt27vgNu4WEW059lAUivvqjMEa3CHOcjJVA0NJkORLxXwdtoUoL0LX1xQMtw8Y007wfCldJInvAEmhYiPwd0tYQS5InLXR4sRdTzt_edA3l-T4o75aYiX_hgZ4qF6Ghnv3vTGNosbdLG6_9L3T8AsjvR3I7JBUfwssE1oLDCx9VeM2DovrI_DId-4Cx4xYmPR_zjXX0C5oJbe_CFSsRPug8uK1anWDJreuZYgcQ8bMM1D26uLPgnzSmeESOsoxj-9uvxiJA-psDgxtGTC3vfVaFQy0Wpfiz7ppxFi1XOeFS38WokIlg9uy7HaDEbW3eH7KPj0qZtI0nGR2p6qLeulv6nZL1UCdFc_Jzda32ciOkh0vIQmd89CNlNmBSRZcuVM9BU2AIpk4LKuLGXAg9pEjBwogfxSXlDc1TvIuFloABb0vX05tp0-s7PQibfC94qiuMTnfnJ5Azla0rPI2G1k5fwUEIx0FxXVi5rbuDZt3V2Va6B3QT6_o2-V6PX4RX9LiWAiG3rnab3QPGXNsVY1nE" };
    importRsaPublicKey(userPublicKey).then(function (key) {
        //var readKey = stringToArrayBuffer(JSON.parse(addressesOfUserProfile[0].readKey));
        var entry = {
            key: addressesOfUserProfile[0].symmetricKey
        }
        encryptRsaMessage(stringToArrayBuffer(JSON.stringify(entry)), key).then(function (ciphertext) {
            console.log("ciphertext:");
            console.log(JSON.stringify(ciphertext));

            var firstAddress = addressesOfUserProfile[0];
            importECDSAPrivateKey(JSON.parse(firstAddress.readKey)).then(function (key) {
                readProfileMessagesFromAddress(addressesOfUserProfile[0].address, key, JSON.stringify(ciphertext));
            });
        });
    });
    */
    /*

    var symmetricKey = addressesOfUserProfile[0].symmetricKey;
    importAESKey(JSON.parse(symmetricKey)).then(function (key) {
        var entry = {
            keys: "v05rj",
            key: symmetricKey
        }
        encryptAESMessage(key, stringToArrayBuffer(JSON.stringify(entry))).then(function (ciphertext) {
            var firstAddress = addressesOfUserProfile[0];
            importECDSAPrivateKey(JSON.parse(firstAddress.readKey)).then(function (key) {
                readProfileMessagesFromAddress(addressesOfUserProfile[0].address, key, JSON.stringify(arrayBufferToString(ciphertext.ciphertext)), JSON.stringify(arrayBufferToString(ciphertext.iv)));
            });
        });
    });
    */

    var symmetricKey = addressesOfUserProfile[0].symmetricKey;
    importAESKey(JSON.parse(symmetricKey)).then(function (key) {

        var entry = {
            //"content": "This is the third posting! k3 is needed to decrypt it."
            //"Residence": "Freiburg im Breisgau, Germany"
            //"School": "not yet"
            address: "h68pa",
        }

        encryptAESMessage(key, stringToArrayBuffer(JSON.stringify(entry))).then(function (ciphertext) {

            var profileEntry = {
                ciphertext: arrayBufferToString(ciphertext.ciphertext),
                key: "k1"
            }

            var firstAddress = addressesOfUserProfile[0];
            importECDSAPrivateKey(JSON.parse(firstAddress.readKey)).then(function (key) {
                readProfileMessagesFromAddress(addressesOfUserProfile[0].address, key, JSON.stringify(profileEntry), JSON.stringify(arrayBufferToString(ciphertext.iv)));
            });
        });
    });

    /*var symmetricKey = addressesOfUserProfile[0].symmetricKey;
    importAESKey(JSON.parse(symmetricKey)).then(function (key) {
        var entry = {
            address: "h68pa",
            key: "k1"
        }
        encryptAESMessage(key, stringToArrayBuffer(JSON.stringify(entry))).then(function (ciphertext) {
            var firstAddress = addressesOfUserProfile[0];
            importECDSAPrivateKey(JSON.parse(firstAddress.readKey)).then(function (key) {
                readProfileMessagesFromAddress(addressesOfUserProfile[0].address, key, JSON.stringify(arrayBufferToString(ciphertext.ciphertext)), JSON.stringify(arrayBufferToString(ciphertext.iv)));
            });
        });
    });*/
}

function retrieveProfile() {
    var timestamp = Date.now;
    var firstAddress = addressesOfUserProfile[0];
    var userPrivateKey = { "alg": "RSA-OAEP-256", "d": "EiTiUIiKcRaEqUUYUYJ4Wr3rUvjj2zay9SHnw_GV7S_biCLFzeWjDG4S2tIjN_D46FZr4A7nJucCmT5ZPKZmCZccJ8V8SBDALMB3JDzz3NvwK4snNJX8Zpbe8S6Mw-7MJz6wVgcZGouTcYmJi8HMM0CWGgBzMp5w-Pstw2t2K3TbvDvwXN9cd25TLu9M_1QV8BSOPu3fz3ddIJK6j1qqJ-zzil7g-1UxBnBjqiwwl5lmrP9SaBiXdMP66Tqy4fEAsm1tDNc3rwZm6xq4pIOJ2ATDTNsPrMOoszSmqtU_xCpX4-9WOY9UrvxUfBxT3xURfecdijULQ2CeRfjiE5wvlHt2TYVIR1dyiRSDwt0dsHswMEppW40r7dQULgbSGZicYiH44iBkgfWgcutU4O3b4DeSDZA4nI2UUuS5zpWx2IO3qtAP4kDRHp7bXs2hBHc58EFc-C316Hb2yOe8J2I2ameLdVvu7egKB-rCYhkiKAoznwRinBn2BQuPuL3Fb5cAjW_MDbSAthRMwB4FDhqNnsLxU2SWeaDtIUzUfRdwMgjA_iAkwh8ihBBVzS-DS-Wv2ZheKjXT9Br84_jrMJdoh1_q5w4IS8Of_O1C8nIfQD-EbvrAU-qMKrqaiblOpgTNUTr1U3T1U1WA7vd-q_EVStcggar1a4rZcQ4BXWIU78M", "dp": "NCNvLbV4_4q95tdRlcanXzuHOnWp6VAGrRz0JvUoayw_Gyzn0Jaqv338LzVOikeBRxk4bqjZ8bIEPy3CPnN8Tit_M8Uw0XAeZN7sR2FO7i90YzayV9s05xmQtYeNt3S_2pXgINC0Q-R0ooXUQ8n28QDa1gacp0wvlfhQwYu9y_LXQyhx05BHnkSt-oe41yFtg212XuN_wTUIoo6y-3MyI5n7CeFN6cabxvluAPdKnQEqeaZwSX9S4OH8B6iik83i4iMjJ99xxA4vfNPaJiVCD2asyW7k4JJbPMa_ukPiJlLDFoOFstYM8nIaxpbtX1paQn57lXcx_AiGLIU7-2woMw", "dq": "X39xelaNbxrXUZ0ifljJ7Qos87Yo1YUClIVVi5Vm85P0inn59mdAD1pwGIXnmcmew1WFVV0OATuah3uR8Q6a9EmXEPow5qKhK3g7JbxhK0lzFayhZKQyuyHRVJN4JmwQw3oBbaacbDolfpoT47E7sGbM2Zb5jlKxeJghrSS2SfcCfvZyGXTUF6uv6Py-zKAmZEI00eLNFCu6ibbFiry1gSbsxGeUIG35QXPe4GFhjEd37MlWA_250ltf2ZQHqZ2A9XtK75kQsoauZDoBFhj8J5zqqyzsDv5g-jbQzsIRQNiKpyfDEfEOZT-k6YcowN27wXNX_R8wNNhnLS2p3UKilw", "e": "AQAB", "ext": true, "key_ops": ["decrypt"], "kty": "RSA", "n": "omQbzvHtbEEodatYfUHGHMhB5a6a_A0mto9nxpJgRh-qIt3S45wdglr6ULBpy0A8LaKgl2g-J0Q-TxRPvtIIfrziS_UGMJi3hsdOtCftvnEQZVzLZHdj9JPMMKXIL0BrDR9K7a2jGMsfGf4dcn2urt27vgNu4WEW059lAUivvqjMEa3CHOcjJVA0NJkORLxXwdtoUoL0LX1xQMtw8Y007wfCldJInvAEmhYiPwd0tYQS5InLXR4sRdTzt_edA3l-T4o75aYiX_hgZ4qF6Ghnv3vTGNosbdLG6_9L3T8AsjvR3I7JBUfwssE1oLDCx9VeM2DovrI_DId-4Cx4xYmPR_zjXX0C5oJbe_CFSsRPug8uK1anWDJreuZYgcQ8bMM1D26uLPgnzSmeESOsoxj-9uvxiJA-psDgxtGTC3vfVaFQy0Wpfiz7ppxFi1XOeFS38WokIlg9uy7HaDEbW3eH7KPj0qZtI0nGR2p6qLeulv6nZL1UCdFc_Jzda32ciOkh0vIQmd89CNlNmBSRZcuVM9BU2AIpk4LKuLGXAg9pEjBwogfxSXlDc1TvIuFloABb0vX05tp0-s7PQibfC94qiuMTnfnJ5Azla0rPI2G1k5fwUEIx0FxXVi5rbuDZt3V2Va6B3QT6_o2-V6PX4RX9LiWAiG3rnab3QPGXNsVY1nE", "p": "zNfzIFCkmDx9Ee2utZ4ivlBsn92ws-TtlgJiANlNF5FK3kCn6ryaHXJIXPaOz5y65xGwCpQLZU27DMDWzAwDR2fXmJGO336X2z_QddOPeC_Mecc1xLFrsXZWFOgINe-Rfilyg1nHr7dyyzLjAQghMdPzxErfQ43dMiLwwizlB-nTvWPwKYey_4dgv9xyeDNEqMyR3IQlVZINl0s9AX3KmvlNoyg4hgQq32A5X1a_v1sbIVzU84RfNvhbH7OLvUd7CSG0wTm2ugh-v9sHeU6vq2tyIsVdWK1qemfn1DmWaswKwyjHmyMQadEmTQlQnv0X8EvYV9OMFtAqzYvFYqLS4w", "q": "yvIWR06vWemOoFUrxI6_0noo-UKnmR0psWMbuannlgjiHG1yRNOq0X4dfmbrRPfPsfAmeZlPJ3PGSFqYIfCTlfLct2ZpHcn9rS63Qaqr4aOxqa6XRkydWf9jua3XSkW9XvarLxwIn6Loha25CiUiY4TBJ6-8tG-7bSYc6k_vhPzCEI90AhU_TPVYmqPHy7ohDwWUPCFttUeNwSvEE_mG7zoVKZVeE8p0bXO6vLAZv1ee4NssoT1rOhwgSGsg8cXuAt_R3pRYMDVEmaQ3a2SWY5s-HlRAJpqmk4scfpEni8xlThe1xLbLcqGb0ISSd1d9w60Zi-0Vl3XE2-N4Hg3tmw", "qi": "mRhShQLSDa8-6etxp8V6xQRSRthwpB9rvYiyhQEQzUFumm5F7orjF7H9mhy7NRZ_h31AjxUFcVKQnk6MyCrT71oUMrIJkd_LutYfi6YfbDzgLlCe9saDXzqH2VoIUoBoQG7q8XGclLO1tZBXAA65FkXFsVd5Xw7IyliUst5OM2OvE7q1bWI0f8_JCK-JueWgd5rvW69vZXc1r9rQWZfZ5UYP3XIQi3kKqz5rjmZMKui8ejMGHGPBVvxQQsAjGu6WEsXQQXvsbP8HJXDYv57u2zVJfzdtADuDZ2npgXI6xN3Q9uayIGhciRNSj5myJwNatL-mHMAFssnmnqi2smQrLg" };
    var userPublicKey = { "alg": "RSA-OAEP-256", "e": "AQAB", "ext": true, "key_ops": ["encrypt"], "kty": "RSA", "n": "omQbzvHtbEEodatYfUHGHMhB5a6a_A0mto9nxpJgRh-qIt3S45wdglr6ULBpy0A8LaKgl2g-J0Q-TxRPvtIIfrziS_UGMJi3hsdOtCftvnEQZVzLZHdj9JPMMKXIL0BrDR9K7a2jGMsfGf4dcn2urt27vgNu4WEW059lAUivvqjMEa3CHOcjJVA0NJkORLxXwdtoUoL0LX1xQMtw8Y007wfCldJInvAEmhYiPwd0tYQS5InLXR4sRdTzt_edA3l-T4o75aYiX_hgZ4qF6Ghnv3vTGNosbdLG6_9L3T8AsjvR3I7JBUfwssE1oLDCx9VeM2DovrI_DId-4Cx4xYmPR_zjXX0C5oJbe_CFSsRPug8uK1anWDJreuZYgcQ8bMM1D26uLPgnzSmeESOsoxj-9uvxiJA-psDgxtGTC3vfVaFQy0Wpfiz7ppxFi1XOeFS38WokIlg9uy7HaDEbW3eH7KPj0qZtI0nGR2p6qLeulv6nZL1UCdFc_Jzda32ciOkh0vIQmd89CNlNmBSRZcuVM9BU2AIpk4LKuLGXAg9pEjBwogfxSXlDc1TvIuFloABb0vX05tp0-s7PQibfC94qiuMTnfnJ5Azla0rPI2G1k5fwUEIx0FxXVi5rbuDZt3V2Va6B3QT6_o2-V6PX4RX9LiWAiG3rnab3QPGXNsVY1nE" };
    importRsaPrivateKey(userPrivateKey).then(function (privateKey) {
        importAESKey(JSON.parse(firstAddress.symmetricKey)).then(function (aesKey) {
            importECDSAPrivateKey(JSON.parse(firstAddress.readKey)).then(function (ecdsakey) {
                readProfileMessagesFromAddress(firstAddress.address, ecdsakey).then(function (response) {
                    var responseParsed = JSON.parse(response);
                    var responsesToDecrypt = [];
                    var keyEntry = null;
                    var keyIV = null;
                    for (var i = 0; i < responseParsed.length; i++) {
                        var parsedContent = JSON.parse(responseParsed[i].content);
                        if (parsedContent.Name != null) {
                            document.getElementById("profile_name").value = parsedContent.Name;
                        } else if (parsedContent.key == null && parsedContent.key != "k1" && parsedContent.key != "k2" && parsedContent.key != "k3") { //thats the entry containing the key table
                            keyEntry = parsedContent;
                            keyIV = JSON.parse(responseParsed[i].iv);
                        } else { //all encrypted 
                            responsesToDecrypt.push(responseParsed[i]);
                        }
                    }

                    decryptAESMessage(aesKey, stringToArrayBuffer(keyEntry), stringToArrayBuffer(keyIV)).then(function (keyEntries) {
                        parsedKeyEntry = JSON.parse(arrayBufferToString(keyEntries));
                        importAESKey(JSON.parse(parsedKeyEntry.key)).then(function (keysKey) {
                            readProfileMessagesFromAddress(parsedKeyEntry.keys, ecdsakey).then(function (profileKeysCiphertexts) {
                                var parsed = JSON.parse(profileKeysCiphertexts);
                                var profileKeysPromises = [];
                                for (var i = 0; i < parsed.length; i++) {
                                    profileKeysPromises.push(decryptAESMessage(keysKey, stringToArrayBuffer(JSON.parse(parsed[i].content)), stringToArrayBuffer(JSON.parse(parsed[i].iv))));
                                }
                                Promise.all(profileKeysPromises).then(function (profileKeysBuffer) {
                                    var profileKeys = [];
                                    for (var i = 0; i < profileKeysBuffer.length; i++) {
                                        var parsed = JSON.parse(arrayBufferToString(profileKeysBuffer[i]));

                                        profileKeys.push(readProfileMessagesFromAddress(parsed.address, ecdsakey));

                                    }
                                    Promise.all(profileKeys).then(function (profileKeysAtAddressesBuffer) {
                                        var profileKeysDecrypted = [];
                                        for (var i = 0; i < profileKeysAtAddressesBuffer.length; i++) {
                                            var parsed = JSON.parse(profileKeysAtAddressesBuffer[i])[0];

                                            profileKeysDecrypted.push(decryptRsaMessage(stringToArrayBuffer(JSON.parse(parsed.content)), privateKey));

                                        }
                                        Promise.all(profileKeysDecrypted).then(function (aesProfileKeys) {
                                            var profileKeyAssignment = [{ keyId: "k1", key: JSON.parse(aesProfileKeys[0]) },
                                            { keyId: "k2", key: JSON.parse(aesProfileKeys[1]) },
                                            { keyId: "k3", key: JSON.parse(aesProfileKeys[2]) }];

                                            for (var i = 0; i < responsesToDecrypt.length; i++) {
                                                handleDecryptedResponse(responsesToDecrypt[i], profileKeyAssignment, ecdsakey);
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function handleDecryptedResponse(response, keys, ecdsakey) {
    var parsed = JSON.parse(response.content);
    var iv = JSON.parse(response.iv);

    if (parsed.key == "k1") {
        importAESKey(JSON.parse(keys[0].key.key)).then(function (dkey) {
            decryptAESMessage(dkey, stringToArrayBuffer(parsed.ciphertext), stringToArrayBuffer(iv)).then(function (decryptedInfoBuffer) {
                var decryptedInfo = JSON.parse(arrayBufferToString(decryptedInfoBuffer));
                if (decryptedInfo.DateOfBirth != null) {
                    document.getElementById("profile_dob").value = decryptedInfo.DateOfBirth;
                } else if (decryptedInfo.Residence != null) {
                    document.getElementById("profile_residence").value = decryptedInfo.Residence;
                } else if (decryptedInfo.School != null) {
                    document.getElementById("profile_school").value = decryptedInfo.School;
                } else if (decryptedInfo.address != null) {
                    readProfileMessagesFromAddress(decryptedInfo.address, ecdsakey).then(function (postingEntries) {
                        var postings = JSON.parse(arrayBufferToString(postingEntries));

                        var importAllKeys = [importAESKey(JSON.parse(keys[0].key.key)), importAESKey(JSON.parse(keys[1].key.key)), importAESKey(JSON.parse(keys[2].key.key))];
                        Promise.all(importAllKeys).then(function (importedKeys) {
                            var postingsDecrypt = [];

                            for (var i = 0; i < postings.length; i++) {
                                var parsed2 = JSON.parse(postings[i].content);
                                var iv2 = JSON.parse(postings[i].iv);
                                if (parsed2.key == "k1") {
                                    postingsDecrypt.push(decryptAESMessage(importedKeys[0], stringToArrayBuffer(parsed2.ciphertext), stringToArrayBuffer(iv2)));
                                } else if (parsed2.key == "k2") {
                                    postingsDecrypt.push(decryptAESMessage(importedKeys[1], stringToArrayBuffer(parsed2.ciphertext), stringToArrayBuffer(iv2)));
                                } else if (parsed2.key == "k3") {
                                    postingsDecrypt.push(decryptAESMessage(importedKeys[2], stringToArrayBuffer(parsed2.ciphertext), stringToArrayBuffer(iv2)));
                                }
                            }
                            Promise.all(postingsDecrypt).then(function (p) {
                                var postingsCombined = "";
                                for (var i = 0; i < p.length; i++) {
                                    postingsCombined += JSON.parse(arrayBufferToString(p[i])).content + "<br/>";
                                }
                                document.getElementById("profile_postings").innerHTML = postingsCombined;
                            });
                        });
                    });
                }
            });
        });
    } else if (parsed.key == "k2") {
        importAESKey(JSON.parse(keys[1].key.key)).then(function (dkey) {
            decryptAESMessage(dkey, stringToArrayBuffer(parsed.ciphertext), stringToArrayBuffer(iv)).then(function (decryptedInfoBuffer) {
                var decryptedInfo = JSON.parse(arrayBufferToString(decryptedInfoBuffer));
                if (decryptedInfo.DateOfBirth != null) {
                    document.getElementById("profile_dob").value = decryptedInfo.DateOfBirth;
                } else if (decryptedInfo.Residence != null) {
                    document.getElementById("profile_residence").value = decryptedInfo.Residence;
                } else if (decryptedInfo.School != null) {
                    document.getElementById("profile_school").value = decryptedInfo.School;
                } else if (decryptedInfo.address != null) {
                    readProfileMessagesFromAddress(decryptedInfo.address, ecdsakey).then(function (postingEntries) {
                        var postings = JSON.parse(arrayBufferToString(postingEntries));
                        var sc = 1904;
                    });
                }
            });
        });
    } else if (JSON.parse(responsesToDecrypt[i].content).key == "k3") {

    }
}

var loremIpsum3100 = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.Nam liber temporcum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum.Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.At vero eos et accusam et justo duo dolores et ea rebum.Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.At vero eos et accusam et justo duo dolores et ea rebum.Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum.sanctus sea sed takimata ut vero voluptua.est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.'