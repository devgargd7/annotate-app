import { Image, QueryImage } from './types';

// Mock query images
export const queryImages = (userName: string, taskName: string) => {
  if (taskName === "similar item") {
    var queryImages = ['d5ba8fe7'];
    if (userName === "dev") {
      queryImages = ['d5ba8fe7', '641a687c', '8e27df55', 'ed45125b', 'be126916', 'd10ffc6f', '458ce075', '9e4e341b', '485707a2', 'e453187b', '2ac1da8e', 'e0c28abb', 'f296e351', '2ece4b79', '9adcb28f', '71310328', 'bdc0ccc0', '6b3de178', '9383e1db', 'dbdf7be8', '2f74e0ce', '5143558a', 'abdfcc5e', '00c5ee4b', '15f8e76c', '5d5a7175', '63b0f119', '54900c0b', 'd2205220', 'cb59e888', '784a9fcf', '4139b904', 'e5da039d', '108eefd0'];
    } else if (userName === "divij") {
      queryImages = ['ccefab71', '703a1083', '2ddc42db', 'bbf1d8ce', 'eeb08051', '54b907c2', 'cd6118a9', 'c516a03f', '63d0b285', '2754ae9d', '627ff655', 'd436c459', 'cf12d4d7', '47467c27', '7bdaac43', '77fd8e8e', '60eb2fd8', 'f076bdd0', '2cb76a46', 'ceb566ff', 'e00f709f', '7a2b5005', '376ee744', 'dc5184f4', '4e4b9653', 'c3f6d11a', '0dbae681', 'b1659b84', 'a72bb758', 'a79c94a3', '711fa339', 'ff5872e8', '97c79eb4'];
    } else {
      queryImages = ['03be6d81', '0b33eeb3', '1210b1d7', '2917f19a', '072b3f70', '5914d9e9', '2d055959', '185a6917', '03908a1e', '85df20ac', '8dc74142', '886708e4', '8ae8faf8', '74530632', '91b11c91', '68fba71a', '43435977', '0309cab8', '87586d6c', 'a16d0fcb', '3e97aae1', 'dadf81e7', '78c757e0', '99af6b2b', '8b8ca24e', '02bc71af', '5a8f1ce5', 'fc5c6fc8', '670b2280', 'ef1df41d', 'a3c5de5c', 'fdd2be3f', '91eee730'];
    }
    return queryImages.map(id => ({
      id,
      url: `https://amazon-berkeley-objects.s3.amazonaws.com/spins/original/${id.substring(0, 2)}/${id}/${id}_01.jpg`
    }));
  } else if (taskName === "goes with it") {
    var queryImages = ['d5ba8fe7'];
    return queryImages.map(id => ({
      id,
      url: `https://amazon-berkeley-objects.s3.amazonaws.com/spins/original/${id.substring(0, 2)}/${id}/${id}_01.jpg`
    }));
  } else {
    var queryImages = ['d5ba8fe7'];
    return queryImages.map(id => ({
      id,
      url: `https://amazon-berkeley-objects.s3.amazonaws.com/spins/original/${id.substring(0, 2)}/${id}/${id}_01.jpg`
    }));
  }
}


const image_ids = ["dcc4aaed", "5f0b41d2", "f978ff68", "b6c47f75", "e03c0e3c", "ace8cb9a", "eb2001b0", "50e605ed", "2262b5cd", "10c21dd6", "b232aae4", "92f3037f", "8fc6a4ab", "5783178e", "b985db2c", "cdf1540b", "1e0a1134", "9e3e48f9", "dfe7988d", "9f774c1e", "fc1c7ad5", "2db70441", "a4b229e3", "9148aa88", "eec897e3", "fd979bce", "31181d3d", "8975189c", "c7d3f660", "82b06348", "d6ea3e2b", "ce5d9699", "a46b3c7a", "f0ff6d72", "f55868fd", "7f71b533", "ee9b5d10", "38a911c1", "335f204f", "169ead30", "c0d625a1", "feb29557", "88d756bf", "f1e88bad", "25477b26", "dd3a493c", "803de884", "0289043e", "7a2a2c3a", "ed497571", "9f133876", "6aee8c24", "2f2ed774", "2d6d1cc2", "d9b27fa1", "c785b453", "f5ff11f4", "8fbbdf9f", "eb505316", "c56c68d1", "bf5bae59", "320c413a", "cfb8c27d", "ac813dae", "6de09cdb", "fe1aaa48", "154cc584", "1cb5132c", "a27182a7", "870380b1", "6e6edcb2", "45bc4ac0", "16226f31", "9839129d", "56b71b1c", "8259c540", "41b29e1d", "bad92b42", "9d80bad3", "797f613d", "408855bc", "5805d66f", "7b804ca2", "0557c889", "597a3fd1", "1ef69e4f", "22727b09", "d832c2d5", "36f864ad", "3cc0060a", "e923ba7b", "016c180d", "1ffc7c4b", "dbfeb28d", "391c9700", "38de81a0", "972b0cc3", "2b42e9e6", "2072a91c", "c39be9eb", "a3c886a3", "1b5a43f3", "2490b893", "48187cc3", "f0a4ccb9", "84edef0c", "c9dac3ca", "8763ca67", "61dadf3b", "67137b4d", "3a6ed7c7", "10f2b57c", "7f9a2cf5", "3feadbd5", "deb95237", "fc0cef0b", "ead4a59a", "95f6991e", "ec8af380", "f0a50948", "67a7d5ff", "1fdde888", "195df0d2", "445fbb99", "12d85afd", "8bb1ea3b", "269fb175", "233f395b", "0f699752", "6af6ee63", "00792bd3", "053a5612", "8bfb317c", "94fc15d2", "77fea50a", "e11fca20", "e34f3cd0", "1d116086", "3b6927c8", "4a259c8c", "20dd5eac", "462f9477", "15e3a869", "732321d6", "bf608cc8", "10f3b418", "4624e31c", "0c97d939", "9b628ece", "bb4e56ba", "626530e8", "47c05aa1", "5955d0f4", "ff75973a", "508aa4fc", "bd17e521", "ee5048ae", "f61b879d", "e13bbfd5", "f77e7808", "c79f7b79", "0bee44f0", "1c8b718f", "b6896ea8", "80b8691e", "1b029427", "1edffa98", "620a8778", "f97ec45a", "f77b3d1e", "099366da", "6af59702", "1d873b1d", "873546c1", "387d5310", "e66e3a5f", "12993bb7", "5a8d22a4", "06443798", "f61d7438", "906f5b7b", "346fe142", "15e1cdc8", "7c144cb9", "77799ced", "c6db9497", "8e31209b", "4881dec6", "7b5f5bc3", "e1dbe23a", "382ea3e5", "71daa5cd", "bf41c953", "47c7d674", "79fb761b", "f556192a", "baf511ce", "425cbadc", "640fa87a", "f1155c0b", "c4360727", "aaa268ad", "c8639cdd", "2ea0d1b8"]

// Mock images to be annotated
export const candidateImages: Image[] = image_ids.map(id => {
  const prefix = id.substring(0, 2);
  const imageUrl = `https://amazon-berkeley-objects.s3.amazonaws.com/spins/original/${prefix}/${id}/${id}_01.jpg`;
  return {
    id,
    url: imageUrl
  };
});
