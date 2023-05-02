import { memberData } from "/data.js";

const radioContainer = document.getElementById("district-radios")
const modalInner = document.getElementById("modal-inner")
let modal = document.getElementById("member-modal")
let getMemberBtn = document.getElementById("get-member")
const closeBtn = document.getElementById("close-btn")

closeBtn.addEventListener("click",function(){
    modal.style.display="none"
})

getMemberBtn.addEventListener("click",renderMember)


function getDistrictArray(districts)
{
    const districtArray = []
    for(let location of districts)
    {
        if(!districtArray.includes(location.district))
        {
            districtArray.push(location.district)
        }
        
    }
    return districtArray
}

function renderDistricts(districts)
{
    let printer = ""
    const locationArray = getDistrictArray(districts)
    for( let location of locationArray)
    {
        printer += `
        <div class = "radio">
        <label for="${location}">${location}</label>
        <input type = "radio"
        name = "districts"
        value = "${location}"
        id = "${location}"
        >
        </div>
        `
    }
    radioContainer.innerHTML = printer
}

renderDistricts(memberData)


function getMatchingData()
{
    let selectedDistrict = document.querySelector("input[type='radio']:checked").value
    const MatchingMemberArray = memberData.filter(function(people){
        return people.district.includes(selectedDistrict)
    })
    return MatchingMemberArray
}


function getSingleDistrict()
{
    const locationArray = getMatchingData()

    if(locationArray.length === 1)
    {
        return locationArray[0]
    }
    else
    {
        let random = Math.floor(Math.random()*locationArray.length)
        return locationArray[random]
    }
}

function renderMember()
{
    const memberObjetc = getSingleDistrict()
    console.log(memberObjetc)
    modalInner.innerHTML = `
    <img 
    class="member-img" 
    src="/images/${memberObjetc.image}"
    alt="${memberObjetc.fullName}"
    >
    <h3>Name:${memberObjetc.fullName}</h3>
    `
    modal.style.display= "flex"

}