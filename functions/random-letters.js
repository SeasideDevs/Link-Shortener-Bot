module.exports = {
  random(length) {
    if (isNaN(length)) {
      throw new TypeError(`"length" should be a number`)
    }
    const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    let count;
    let string = 'e'

    for (count = 0; count <= length; count++) {
      const randomNum = Math.floor(Math.random() * letters.length)
      string += letters[randomNum]
    }

    return string
  }
}