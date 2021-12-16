function hashCode(password){
    if (password.length==1){
        let hash = password.charCodeAt(0);
        hash = (hash<<5&2246)+hash;
        hash = hash & hash;
        return hash;
    }

    else{
        return hashCode(password[0])+hashCode(password.substr(1));
    }
}


module.exports[hashCode];
