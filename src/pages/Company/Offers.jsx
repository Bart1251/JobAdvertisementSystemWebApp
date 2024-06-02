import { useState } from "react";
import { useApi } from "../../contexts/ApiContext";
import { useValidation } from "../../contexts/ValidationContext";

export default function Offers(props) {
    const { apiRequest } = useApi();
    const { validateArrayFields } = useValidation();
    const [offers, setOffers] = useState(props.offersSet ? props.offersSet : []);
    const [newOffers, setNewOffers] = useState([]);
    const [offerNewResponsibilities, setOfferNewResponsibilities] = useState(props.offersSet ? props.offersSet.map(e => {return {id: e.offer_id, responsibilities: []}}) : []);
    const [offerNewRequirements, setOfferNewRequirements] = useState(props.offersSet ? props.offersSet.map(e => {return {id: e.offer_id, requirements: []}}) : []);
    const [offerNewBenefits, setOfferNewBenefits] = useState(props.offersSet ? props.offersSet.map(e => {return {id: e.offer_id, benefits: []}}) : []);
    const [offersToDelete, setOffersToDelete] = useState([]);
    const [offerResponsibilitiesToDelete, setOfferResponsibilitiesToDelete] = useState(props.offersSet ? props.offersSet.map(e => {return {id: e.offer_id, responsibilities: []}}) : []);
    const [offerRequirementsToDelete, setOfferRequirementsToDelete] = useState(props.offersSet ? props.offersSet.map(e => {return {id: e.offer_id, requirements: []}}) : []);
    const [offerBenefitsToDelete, setOfferBenefitsToDelete] = useState(props.offersSet ? props.offersSet.map(e => {return {id: e.offer_id, benefits: []}}) : []);
    const [offersErrors, setOffersErrors] = useState([[], false]);
    const [newOffersErrors, setNewOffersErrors] = useState([[], false]);
    const [offerNewResponsibilitiesErrors, setOfferNewResponsibilitiesErrors] = useState([[], false]);
    const [offerNewRequirementsErrors, setOfferNewRequirementsErrors] = useState([[], false]);
    const [offerNewBenefitsErrors, setOfferNewBenefitsErrors] = useState([[], false]);


    function handleOfferChange(e) {
        const { name, value } = e.target;
        const key = findKey(e.target.parentNode);
        setOffers(prevState => {
            const updatedState = [...prevState];
            if (name == "responsibilities") {
                updatedState[updatedState.findIndex(se => se.offer_id == key)][name][updatedState.find(se => se.offer_id == key)[name].findIndex(se => se.offer_responsibility_id == parseInt(e.target.getAttribute('data-key')))].offer_responsibility = value;
                return updatedState;
            } else if (name == "benefits") {
                updatedState[updatedState.findIndex(se => se.offer_id == key)][name][updatedState.find(se => se.offer_id == key)[name].findIndex(se => se.benefit_id == parseInt(e.target.getAttribute('data-key')))].benefit = value;
                return updatedState;
            } else if (name == "requirements") {
                updatedState[updatedState.findIndex(se => se.offer_id == key)][name][updatedState.find(se => se.offer_id == key)[name].findIndex(se => se.requirement_id == parseInt(e.target.getAttribute('data-key')))].requirement = value;
                return updatedState;
            } else if (name == "expires") {
                if (value == "0000-00-00" || value == "") {
                    updatedState[updatedState.findIndex(se => se.offer_id == key)][name] = null;
                } else {
                    updatedState[updatedState.findIndex(se => se.offer_id == key)][name] = value;
                }
                return updatedState;
            } else {
                updatedState[updatedState.findIndex(se => se.offer_id == key)][name] = value;
                return updatedState;
            }
        });
    }

    function handleNewOfferChange(e) {
        const { name, value } = e.target;
        const key = findKey(e.target.parentNode);
        setNewOffers(prevState => {
            const updatedState = [...prevState];
            if (name == "responsibilities" || name == "benefits" || name == "requirements") {
                updatedState[-(key + 1)][name][parseInt(e.target.getAttribute('data-key'))] = value;
                return updatedState;
            } else if (name == "expires") {
                if (value == "0000-00-00" || value == "") {
                    updatedState[-(key + 1)][name] = null;
                } else {
                    updatedState[-(key + 1)][name] = value;
                }
                return updatedState;
            } else {
                updatedState[-(key + 1)][name] = value;
                return updatedState;
            }
        });
    }

    function handleOfferNewResponsibilitiesChange(e) {
        const key = findKey(e.target.parentNode);
        setOfferNewResponsibilities(prevState => {
            const updatedState = [...prevState];
            updatedState[updatedState.findIndex(se => se.id == key)].responsibilities[-(parseInt(e.target.getAttribute('data-key')) + 1)] = e.target.value;
            return updatedState;
        });
    }

    function handleOfferNewRequirementsChange(e) {
        const key = findKey(e.target.parentNode);
        setOfferNewRequirements(prevState => {
            const updatedState = [...prevState];
            updatedState[updatedState.findIndex(se => se.id == key)].requirements[-(parseInt(e.target.getAttribute('data-key')) + 1)] = e.target.value;
            return updatedState;
        });
    }

    function handleOfferNewBenefitsChange(e) {
        const key = findKey(e.target.parentNode);
        setOfferNewBenefits(prevState => {
            const updatedState = [...prevState];
            updatedState[updatedState.findIndex(se => se.id == key)].benefits[-(parseInt(e.target.getAttribute('data-key')) + 1)] = e.target.value;
            return updatedState;
        });
    }

    function addOffer(e) {
        setNewOffers(prevState => {
            return [{position: "", min_wage: 0, max_wage: 0, work_days: "", work_hours: "", expires: null, description: "", available_posts: 0, category_id: props.categories[0].category_id, job_level_id: props.jobLevels[0].job_level_id, type_of_contract_id: props.typesOfContract[0].type_of_contract_id, work_shift_id: props.workShifts[0].work_shift_id, job_type_id: props.jobTypes[0].job_type_id, responsibilities: [], requirements: [], benefits: []}, ...prevState]
        });
    }

    function addNewResponsibility(e) {
        const key = findKey(e.target.parentNode);
        setOfferNewResponsibilities(prevState => {
            const updatedState = [...prevState];
            updatedState[updatedState.findIndex(se => se.id == key)].responsibilities.push("");
            return updatedState;
        });
    }

    function addNewRequirement(e) {
        const key = findKey(e.target.parentNode);
        setOfferNewRequirements(prevState => {
            const updatedState = [...prevState];
            updatedState[updatedState.findIndex(se => se.id == key)].requirements.push("");
            return updatedState;
        });
    }

    function addNewBenefit(e) {
        const key = findKey(e.target.parentNode);
        setOfferNewBenefits(prevState => {
            const updatedState = [...prevState];
            updatedState[updatedState.findIndex(se => se.id == key)].benefits.push("");
            return updatedState;
        });
    }

    function addNewOfferResponsibility(e) {
        const key = findKey(e.target.parentNode);
        setNewOffers(prevState => {
            const updatedState = [...prevState];
            updatedState[-(key + 1)].responsibilities.push("");
            return updatedState;
        });
    }

    function addNewOfferRequirement(e) {
        const key = findKey(e.target.parentNode);
        setNewOffers(prevState => {
            const updatedState = [...prevState];
            updatedState[-(key + 1)].requirements.push("");
            return updatedState;
        });
    }

    function addNewOfferBenefit(e) {
        const key = findKey(e.target.parentNode);
        setNewOffers(prevState => {
            const updatedState = [...prevState];
            updatedState[-(key + 1)].benefits.push("");
            return updatedState;
        });
    }

    function deleteOffer(e) {
        const key = findKey(e.target.parentNode);
        setOffersToDelete(prevState => { return [...prevState, key]});
        setOffers(prevState => {
            const updatedState = [...prevState];
            updatedState.splice(updatedState.findIndex(se => se.offer_id == key), 1);
            return updatedState;
        });
        setOffersErrors([[], false]);
        setNewOffersErrors([[], false]);
        setOfferNewResponsibilitiesErrors([[], false]);
        setOfferNewRequirementsErrors([[], false]);
        setOfferNewBenefitsErrors([[], false]);
    }

    function deleteResponsibility(e) {
        const key = findKey(e.target.parentNode);
        setOffers(prevState => {
            const updatedState = [...prevState];
            updatedState[updatedState.findIndex(se => se.offer_id == key)].responsibilities.splice(updatedState[updatedState.findIndex(se => se.offer_id == key)].responsibilities.findIndex(se => se.offer_responsibility_id == parseInt(e.target.previousElementSibling.getAttribute('data-key'))), 1);
            setOfferResponsibilitiesToDelete(prevState => { return [...prevState, parseInt(e.target.previousElementSibling.getAttribute('data-key'))]});
            return updatedState;
        });
        setOffersErrors([[], false]);
        setNewOffersErrors([[], false]);
        setOfferNewResponsibilitiesErrors([[], false]);
        setOfferNewRequirementsErrors([[], false]);
        setOfferNewBenefitsErrors([[], false]);
    }

    function deleteRequirement(e) {
        const key = findKey(e.target.parentNode);
        setOffers(prevState => {
            const updatedState = [...prevState];
            updatedState[updatedState.findIndex(se => se.offer_id == key)].requirements.splice(updatedState[updatedState.findIndex(se => se.offer_id == key)].requirements.findIndex(se => se.requirement_id == parseInt(e.target.previousElementSibling.getAttribute('data-key'))), 1);
            setOfferRequirementsToDelete(prevState => { return [...prevState, parseInt(e.target.previousElementSibling.getAttribute('data-key'))]});
            return updatedState;
        });
        setOffersErrors([[], false]);
        setNewOffersErrors([[], false]);
        setOfferNewResponsibilitiesErrors([[], false]);
        setOfferNewRequirementsErrors([[], false]);
        setOfferNewBenefitsErrors([[], false]);
    }

    function deleteBenefit(e) {
        const key = findKey(e.target.parentNode);
        setOffers(prevState => {
            const updatedState = [...prevState];
            updatedState[updatedState.findIndex(se => se.offer_id == key)].benefits.splice(updatedState[updatedState.findIndex(se => se.offer_id == key)].responsibilities.findIndex(se => se.benefit_id == parseInt(e.target.previousElementSibling.getAttribute('data-key'))), 1);
            setOfferBenefitsToDelete(prevState => { return [...prevState, parseInt(e.target.previousElementSibling.getAttribute('data-key'))]});
            return updatedState;
        });
        setOffersErrors([[], false]);
        setNewOffersErrors([[], false]);
        setOfferNewResponsibilitiesErrors([[], false]);
        setOfferNewRequirementsErrors([[], false]);
        setOfferNewBenefitsErrors([[], false]);
    }

    function deleteNewOffer(e) {
        const key = findKey(e.target.parentNode);
        setNewOffers(prevState => {
            const updatedState = [...prevState];
            updatedState.splice(-(key + 1), 1);
            return updatedState;
        });
        setOffersErrors([[], false]);
        setNewOffersErrors([[], false]);
        setOfferNewResponsibilitiesErrors([[], false]);
        setOfferNewRequirementsErrors([[], false]);
        setOfferNewBenefitsErrors([[], false]);
    }

    function deleteNewResponsibility(e) {
        const key = findKey(e.target.parentNode);
        setOfferNewResponsibilities(prevState => {
            const updatedState = [...prevState];
            updatedState[updatedState.findIndex(se => se.id == key)].responsibilities.splice(-(parseInt(e.target.previousElementSibling.getAttribute('data-key')) + 1), 1);
            return updatedState;
        });
        setOffersErrors([[], false]);
        setNewOffersErrors([[], false]);
        setOfferNewResponsibilitiesErrors([[], false]);
        setOfferNewRequirementsErrors([[], false]);
        setOfferNewBenefitsErrors([[], false]);
    }

    function deleteNewRequirement(e) {
        const key = findKey(e.target.parentNode);
        setOfferNewRequirements(prevState => {
            const updatedState = [...prevState];
            updatedState[updatedState.findIndex(se => se.id == key)].requirements.splice(-(parseInt(e.target.previousElementSibling.getAttribute('data-key')) + 1), 1);
            return updatedState;
        });
        setOffersErrors([[], false]);
        setNewOffersErrors([[], false]);
        setOfferNewResponsibilitiesErrors([[], false]);
        setOfferNewRequirementsErrors([[], false]);
        setOfferNewBenefitsErrors([[], false]);
    }

    function deleteNewBenefit(e) {
        const key = findKey(e.target.parentNode);
        setOfferNewBenefits(prevState => {
            const updatedState = [...prevState];
            updatedState[updatedState.findIndex(se => se.id == key)].benefits.splice(-(parseInt(e.target.previousElementSibling.getAttribute('data-key')) + 1), 1);
            return updatedState;
        });
        setOffersErrors([[], false]);
        setNewOffersErrors([[], false]);
        setOfferNewResponsibilitiesErrors([[], false]);
        setOfferNewRequirementsErrors([[], false]);
        setOfferNewBenefitsErrors([[], false]);
    }

    function deleteNewOfferResponsibility(e) {
        const key = findKey(e.target.parentNode);
        setNewOffers(prevState => {
            const updatedState = [...prevState];
            updatedState[-(key + 1)].responsibilities.splice(parseInt(e.target.previousElementSibling.getAttribute('data-key')), 1);
            return updatedState;
        });
        setOffersErrors([[], false]);
        setNewOffersErrors([[], false]);
        setOfferNewResponsibilitiesErrors([[], false]);
        setOfferNewRequirementsErrors([[], false]);
        setOfferNewBenefitsErrors([[], false]);
    }

    function deleteNewOfferRequirement(e) {
        const key = findKey(e.target.parentNode);
        setNewOffers(prevState => {
            const updatedState = [...prevState];
            updatedState[-(key + 1)].requirements.splice(parseInt(e.target.previousElementSibling.getAttribute('data-key')), 1);
            return updatedState;
        });
        setOffersErrors([[], false]);
        setNewOffersErrors([[], false]);
        setOfferNewResponsibilitiesErrors([[], false]);
        setOfferNewRequirementsErrors([[], false]);
        setOfferNewBenefitsErrors([[], false]);
    }

    function deleteNewOfferBenefit(e) {
        const key = findKey(e.target.parentNode);
        setNewOffers(prevState => {
            const updatedState = [...prevState];
            updatedState[-(key + 1)].benefits.splice(parseInt(e.target.previousElementSibling.getAttribute('data-key')), 1);
            return updatedState;
        });
        setOffersErrors([[], false]);
        setNewOffersErrors([[], false]);
        setOfferNewResponsibilitiesErrors([[], false]);
        setOfferNewRequirementsErrors([[], false]);
        setOfferNewBenefitsErrors([[], false]);
    }

    function findKey(parent) {
        while(parent && !parent.hasAttribute('data-key')) {
            parent = parent.parentNode;
        }
        return parseInt(parent.getAttribute('data-key'));
    }

    
    const offersRegexes = {
        position: /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+(?:[-\' ][A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+)*$/,
        min_wage: /^\d{1,28}(\.\d{1,2})?$/,
        max_wage: /^\d{1,28}(\.\d{1,2})?$/,
        available_posts: /^[0-9]{1,10}$/,
        work_days: /^[A-Za-z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ.]+(?:[-\' ][A-Za-z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ.]+)*(?:\s*-\s*[A-Za-z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ.]+)*$/,
        work_hours: /^[A-Za-z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ.]+(?:[-\' ][A-Za-z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ.]+)*(?:\s*-\s*[A-Za-z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ.]+)*$/,
        expires: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
        description: /^[\w\s.,!?;:'"-]{1,500}$/,
        responsibilities: { offer_responsibility: /^[\w\s.,!?;:\'"-ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]{1,300}$/ },
        requirements: { requirement: /^[\w\s.,!?;:\'"-ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]{1,300}$/ },
        benefits: { benefit: /^[\w\s.,!?;:\'"-ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]{1,300}$/ },
    };
    const newOffersRegexes = {
        position: /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+(?:[-\' ][A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+)*$/,
        min_wage: /^\d{1,28}(\.\d{1,2})?$/,
        max_wage: /^\d{1,28}(\.\d{1,2})?$/,
        available_posts: /^[0-9]{1,10}$/,
        work_days: /^[A-Za-z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ.]+(?:[-\' ][A-Za-z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ.]+)*(?:\s*-\s*[A-Za-z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ.]+)*$/,
        work_hours: /^[A-Za-z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ.]+(?:[-\' ][A-Za-z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ.]+)*(?:\s*-\s*[A-Za-z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ.]+)*$/,
        expires: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
        description: /^[\w\s.,!?;:'"-]{1,500}$/,
        responsibilities: /^[\w\s.,!?;:\'"-ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]{1,300}$/,
        requirements: /^[\w\s.,!?;:\'"-ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]{1,300}$/,
        benefits: /^[\w\s.,!?;:\'"-ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]{1,300}$/,
    };
    const offerNewResponsibilitiesRegexes = {
        responsibilities: /^[\w\s.,!?;:\'"-ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]{1,300}$/,
    }
    const offerNewRequirementsRegexes = {
        requirements: /^[\w\s.,!?;:\'"-ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]{1,300}$/,
    }
    const offerNewBenefitsRegexes = {
        benefits: /^[\w\s.,!?;:\'"-ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]{1,300}$/,
    }
    const offerMinLenghts = {
        position: 2, min_wage: 1, max_wage: 1, work_days: 2, work_hours: 2, description: 1, available_posts: 1, expires: 0, responsibilities: { responsibility: 2 }, requirements: { requirement: 2 }, benefits: { benefit: 2 },
    };
    const newOfferMinLenghts = {
        position: 2, min_wage: 1, max_wage: 1, work_days: 2, work_hours: 2, description: 1, available_posts: 1, expires: 0, responsibilities: 2, requirements: 2, benefits: 2,
    };
    const offerNewResponsibilitiesMinLengths = {
        responsibilities: 2,
    }
    const offerNewRequirementsMinLengths = {
        requirements: 2,
    }
    const offerNewBenefitsMinLengths = {
        benefits: 2,
    }
    const offerMaxLenghts = {
        position: 50, min_wage: 30, max_wage: 30, work_days: 50, work_hours: 50, description: 500, available_posts: 10, expires: 50, responsibilities: { responsibility: 300 }, requirements: { requirement: 300 }, benefits: { benefit: 300 },
    }
    const newOfferMaxLenghts = {
        position: 50, min_wage: 30, max_wage: 30, work_days: 50, work_hours: 50, description: 500, available_posts: 10, expires: 50, responsibilities: 300, requirements: 300, benefits: 300,
    }
    const offerNewResponsibilitiesMaxLengths = {
        responsibilities: 300,
    }
    const offerNewRequirementsMaxLengths = {
        responsibilities: 300,
    }
    const offerNewBenefitsMaxLengths = {
        responsibilities: 300,
    }
    const offerErrorMessages = {
        position: "Błędna nazwa stanowiska",
        min_wage: "Błędne minimalne wynagrodzenie",
        max_wage: "Błędne maksymalne wynagrodzenie",
        work_days: "Błędne dni robocze",
        work_hours: "Błędne godziny pracy",
        expires: "Błędna data wygaśnięcia oferty",
        description: "Błędny opis",
        available_posts: "Błędna ilość wolnych stanowisk",
        responsibilities: { responsibility: "Błędny obowiązek" },
        requirements: { requirement: "Błędne wymaganie" },
        benefits: { benefit: "Błędny benefit" },
    };
    const newOfferErrorMessages = {
        position: "Błędna nazwa stanowiska",
        min_wage: "Błędne minimalne wynagrodzenie",
        max_wage: "Błędne maksymalne wynagrodzenie",
        work_days: "Błędne dni robocze",
        work_hours: "Błędne godziny pracy",
        expires: "Błędna data wygaśnięcia oferty",
        description: "Błędny opis",
        available_posts: "Błędna ilość wolnych stanowisk",
        responsibilities: "Błędny obowiązek",
        requirements: "Błędne wymaganie",
        benefits: "Błędny benefit",
    };
    const offerNewResponsibilitiesErrorMessages = {
        responsibilities: "Błędny obowiązek",
    }
    const offerNewRequirementsErrorMessages = {
        requirements: "Błędne wymaganie",
    }
    const offerNewBenefitsErrorMessages = {
        benefits: "Błędny benefit",
    }
    
    async function saveOffer(e) {
        e.preventDefault();
        const [errorsTmp1, hasErrors1] = validateArrayFields(offers, offersRegexes, offerMinLenghts, offerMaxLenghts, offerErrorMessages);
        const [errorsTmp2, hasErrors2] = validateArrayFields(offerNewResponsibilities, offerNewResponsibilitiesRegexes, offerNewResponsibilitiesMinLengths, offerNewResponsibilitiesMaxLengths, offerNewResponsibilitiesErrorMessages);
        const [errorsTmp3, hasErrors3] = validateArrayFields(offerNewRequirements, offerNewRequirementsRegexes, offerNewRequirementsMinLengths, offerNewRequirementsMaxLengths, offerNewRequirementsErrorMessages);
        const [errorsTmp4, hasErrors4] = validateArrayFields(offerNewBenefits, offerNewBenefitsRegexes, offerNewBenefitsMinLengths, offerNewBenefitsMaxLengths, offerNewBenefitsErrorMessages);
        const [errorsTmp5, hasErrors5] = validateArrayFields(newOffers, newOffersRegexes, newOfferMinLenghts, newOfferMaxLenghts, newOfferErrorMessages);
        
        if(!hasErrors1 && !hasErrors2 && !hasErrors3 && !hasErrors4 && !hasErrors5) {
            offers.forEach(async se => {
                await apiRequest(`http://127.0.0.1/offer/${se.offer_id}`, "PUT", {
                    position: se.position,
                    min_wage: se.min_wage,
                    max_wage: se.max_wage,
                    work_days: se.work_days,
                    work_hours: se.work_hours,
                    expires: se.expires,
                    available_posts: se.available_posts,
                    description: se.description,
                    category_id: se.category_id,
                    job_level_id: se.job_level_id,
                    type_of_contract_id: se.type_of_contract_id,
                    work_shift_id: se.work_shift_id,
                    job_type_id: se.job_type_id,
                    responsibilities: se.responsibilities,
                    requirements: se.requirements,
                    benefits: se.benefits,
                });
            });
            offerNewResponsibilities.forEach(async se => {
                se.responsibilities.forEach(async sse => {
                    await apiRequest(`http://127.0.0.1/offerResponsibility`, "POST", {
                        offer_id: se.id,
                        responsibility: sse,
                    });
                });
            });
            offerNewRequirements.forEach(async se => {
                se.requirements.forEach(async sse => {
                    await apiRequest(`http://127.0.0.1/offerRequirement`, "POST", {
                        offer_id: se.id,
                        requirement: sse,
                    });
                });
            });
            offerNewBenefits.forEach(async se => {
                se.benefits.forEach(async sse => {
                    await apiRequest(`http://127.0.0.1/offerBenefit`, "POST", {
                        offer_id: se.id,
                        benefit: sse,
                    });
                });
            });
            newOffers.forEach(async se => {
                await apiRequest(`http://127.0.0.1/offer`, "POST", {
                    company_id: props.companyId,
                    position: se.position,
                    min_wage: se.min_wage,
                    max_wage: se.max_wage,
                    work_days: se.work_days,
                    work_hours: se.work_hours,
                    expires: se.expires,
                    description: se.description,
                    available_posts: se.available_posts,
                    category_id: se.category_id,
                    job_level_id: se.job_level_id,
                    type_of_contract_id: se.type_of_contract_id,
                    work_shift_id: se.work_shift_id,
                    job_type_id: se.job_type_id,
                    responsibilities: se.responsibilities,
                    requirements: se.requirements,
                    benefits: se.benefits,
                });
            });
            offersToDelete.forEach(async se => {
                await apiRequest(`http://127.0.0.1/offer/${se}`, "DELETE");
            });
            offerResponsibilitiesToDelete.forEach(async se => {
                await apiRequest(`http://127.0.0.1/offerResponsibility/${se}`, "DELETE");
            });
            offerRequirementsToDelete.forEach(async se => {
                await apiRequest(`http://127.0.0.1/offerRequirement/${se}`, "DELETE");
            });
            offerBenefitsToDelete.forEach(async se => {
                await apiRequest(`http://127.0.0.1/offerBenefit/${se}`, "DELETE");
            });
            const allOffers = await apiRequest(`http://127.0.0.1/companyOffers/${props.companyId}`, "GET");
            props.offersSetter(allOffers);
            setOfferNewResponsibilities(allOffers.map(e => {return {id: e.offer_id, responsibilities: []}}))
            setOfferNewRequirements(allOffers.map(e => {return {id: e.offer_id, requirements: []}}))
            setOfferNewBenefits(allOffers.map(e => {return {id: e.offer_id, benefits: []}}))
            setNewOffers([]);
            setOffersToDelete([]);
            setOfferResponsibilitiesToDelete([]);
            setOfferRequirementsToDelete([]);
            setOfferBenefitsToDelete([]);
            setOffersErrors([[], false]);
            setNewOffersErrors([[], false]);
            setOfferNewResponsibilitiesErrors([[], false]);
            setOfferNewRequirementsErrors([[], false]);
            setOfferNewBenefitsErrors([[], false]);
        }

        setOffersErrors([errorsTmp1, hasErrors1]);
        setNewOffersErrors([errorsTmp5, hasErrors5]);
        setOfferNewResponsibilitiesErrors([errorsTmp2, hasErrors2]);
        setOfferNewRequirementsErrors([errorsTmp3, hasErrors3]);
        setOfferNewBenefitsErrors([errorsTmp4, hasErrors4]);
    }

    return (
        <form className="m-2 m-lg-5" onSubmit={saveOffer}>
            <div className="d-flex gap-3">
                <h4>Zarządzanie ofertami</h4>
                <input type="button" value="Nowy" className="btn btn-primary" style={{transform: "TranslateY(-7px)"}} onClick={addOffer}/>
            </div>

            {newOffers.map((e, i) => { return (
            <div key={-i - 1} data-key={-i - 1} className={`${i > 0 ? 'my-5' : 'mb-5'}`}>
                {i > 0 && <hr/>}
                <div className="row">
                    <div className="col-md-6 col-12">
                        <label htmlFor="postion" className="form-label">Stanowisko</label>
                        <input type="text" value={e.position} onChange={handleNewOfferChange} name="position" className={`form-control ${newOffersErrors[1] && newOffersErrors[0][i].position ? 'is-invalid' : ''}`} id="position"/>
                        {newOffersErrors[1] && <div className="invalid-feedback">{newOffersErrors[0][i].position}</div>}

                        <label htmlFor="min_wage" className="form-label pt-3">Minimalna stawka</label>
                        <input type="number" value={e.min_wage} onChange={handleNewOfferChange} name="min_wage" className={`form-control ${newOffersErrors[1] && newOffersErrors[0][i].min_wage ? 'is-invalid' : ''}`} id="min_wage"/>
                        {newOffersErrors[1] && <div className="invalid-feedback">{newOffersErrors[0][i].min_wage}</div>}

                        <label htmlFor="max_wage" className="form-label pt-3">Maksymalna stawka</label>
                        <input type="number" value={e.max_wage} onChange={handleNewOfferChange} name="max_wage" className={`form-control ${newOffersErrors[1] && newOffersErrors[0][i].max_wage ? 'is-invalid' : ''}`} id="max_wage"/>
                        {newOffersErrors[1] && <div className="invalid-feedback">{newOffersErrors[0][i].max_wage}</div>}

                        <label htmlFor="work_days" className="form-label pt-3">Dni robocze</label>
                        <input type="text" value={e.work_days} onChange={handleNewOfferChange} name="work_days" className={`form-control ${newOffersErrors[1] && newOffersErrors[0][i].work_days ? 'is-invalid' : ''}`} id="work_days"/>
                        {newOffersErrors[1] && <div className="invalid-feedback">{newOffersErrors[0][i].work_days}</div>}

                        <label htmlFor="work_hours" className="form-label pt-3">Godziny pracy</label>
                        <input type="text" value={e.work_hours} onChange={handleNewOfferChange} name="work_hours" className={`form-control ${newOffersErrors[1] && newOffersErrors[0][i].work_hours ? 'is-invalid' : ''}`} id="work_hours"/>
                        {newOffersErrors[1] && <div className="invalid-feedback">{newOffersErrors[0][i].work_hours}</div>}

                        <label htmlFor="expires" className="form-label pt-3">Wygaśnięcie oferty</label>
                        <input type="date" value={e.expires} onChange={handleNewOfferChange} name="expires" className={`form-control ${newOffersErrors[1] && newOffersErrors[0][i].expires ? 'is-invalid' : ''}`} id="expires"/>
                        {newOffersErrors[1] && <div className="invalid-feedback">{newOffersErrors[0][i].expires}</div>}

                        <label htmlFor="available_posts" className="form-label pt-3">Dostępne stanowiska</label>
                        <input type="number" value={e.available_posts} onChange={handleNewOfferChange} name="available_posts" className={`form-control ${newOffersErrors[1] && newOffersErrors[0][i].available_posts ? 'is-invalid' : ''}`} id="available_posts"/>
                        {newOffersErrors[1] && <div className="invalid-feedback">{newOffersErrors[0][i].available_posts}</div>}
                        
                        <label className="pt-3">Obowiązki</label>
                        <ul style={{maxHeight: 335, overflowY: "auto"}}>
                            {e.responsibilities.map((se, j) => { return (
                                <li key={j} className="position-relative">
                                    <input data-key={j} type="text" value={se} onChange={handleNewOfferChange} name="responsibilities" className={`my-3 pe-5 form-control ${newOffersErrors[1] && newOffersErrors[0][i].responsibilities[j] ? 'is-invalid' : ''}`}/>
                                    {newOffersErrors[1] && <div className="invalid-feedback">{newOffersErrors[0][i].responsibilities[j]}</div>}
                                    <input type="button" onClick={deleteNewOfferResponsibility} className="btn-close position-absolute top-0 end-0 mt-2 me-2"/>
                                </li>
                            )})}
                        </ul>
                        <div className="d-flex justify-content-end">
                            <input type="button" className="btn btn-primary" onClick={addNewOfferResponsibility} value="Nowy"/>
                        </div>

                        <label className="pt-3">Wymagania</label>
                        <ul style={{maxHeight: 335, overflowY: "auto"}}>
                            {e.requirements.map((se, j) => { return (
                                <li key={j} className="position-relative">
                                    <input data-key={j} type="text" value={se} onChange={handleNewOfferChange} name="requirements" className={`my-3 pe-5 form-control ${newOffersErrors[1] && newOffersErrors[0][i].requirements[j] ? 'is-invalid' : ''}`}/>
                                    {newOffersErrors[1] && <div className="invalid-feedback">{newOffersErrors[0][i].requirements[j]}</div>}
                                    <input type="button" onClick={deleteNewOfferRequirement} className="btn-close position-absolute top-0 end-0 mt-2 me-2"/>
                                </li>
                            )})}
                        </ul>
                        <div className="d-flex justify-content-end">
                            <input type="button" className="btn btn-primary" onClick={addNewOfferRequirement} value="Nowy"/>
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <label htmlFor="category_id" className="form-label">Kategoria</label>
                        <select onChange={handleNewOfferChange} defaultValue={e.category_id} name="category_id" className="form-select" id="category_id">
                            {props.categories.map(se => {return <option key={se.category_id} value={se.category_id}>{se.category}</option>})}
                        </select>

                        <label htmlFor="job_level_id" className="form-label pt-3">Poziom stanowiska</label>
                        <select onChange={handleNewOfferChange} defaultValue={e.job_level_id} name="job_level_id" className="form-select" id="job_level_id">
                            {props.jobLevels.map(se => {return <option key={se.job_level_id} value={se.job_level_id}>{se.job_level}</option>})}
                        </select>

                        <label htmlFor="type_of_contract_id" className="form-label pt-3">Rodzaj umowy</label>
                        <select onChange={handleNewOfferChange} defaultValue={e.type_of_contract_id} name="type_of_contract_id" className="form-select" id="type_of_contract_id">
                            {props.typesOfContract.map(se => {return <option key={se.type_of_contract_id} value={se.type_of_contract_id}>{se.type_of_contract}</option>})}
                        </select>

                        <label htmlFor="work_shift_id" className="form-label pt-3">Wymiar pracy</label>
                        <select onChange={handleNewOfferChange} defaultValue={e.work_shift_id} name="work_shift_id" className="form-select" id="work_shift_id">
                            {props.workShifts.map(se => {return <option key={se.work_shift_id} value={se.work_shift_id}>{se.work_shift}</option>})}
                        </select>

                        <label htmlFor="job_type_id" className="form-label pt-3">Tryb pracy</label>
                        <select onChange={handleNewOfferChange} defaultValue={e.job_type_id} name="job_type_id" className="form-select" id="job_type_id">
                            {props.jobTypes.map(se => {return <option key={se.job_type_id} value={se.job_type_id}>{se.job_type}</option>})}
                        </select>

                        <label htmlFor="description" className="form-label pt-3">Opis oferty</label>
                        <textarea value={e.description} onChange={handleNewOfferChange} name="description" style={{minHeight: 123}} className={`form-control ${offersErrors[1] && offersErrors[0][i].description ? 'is-invalid' : ''}`} id="description"/>
                        {offersErrors[1].description && <div className="invalid-feedback">{offersErrors[0].description}</div>}
                    
                        <label className="pt-3">Benefity</label>
                        <ul style={{maxHeight: 335, overflowY: "auto"}}>
                            {e.benefits.map((se, j) => { return (
                                <li key={j} className="position-relative">
                                    <input data-key={j} type="text" value={se} onChange={handleNewOfferChange} name="benefits" className={`my-3 pe-5 form-control ${newOffersErrors[1] && newOffersErrors[0][i].benefits[j] ? 'is-invalid' : ''}`}/>
                                    {newOffersErrors[1] && <div className="invalid-feedback">{newOffersErrors[0][i].benefits[j]}</div>}
                                    <input type="button" onClick={deleteNewOfferBenefit} className="btn-close position-absolute top-0 end-0 mt-2 me-2"/>
                                </li>
                            )})}
                        </ul>
                        <div className="d-flex justify-content-end">
                            <input type="button" className="btn btn-primary" onClick={addNewOfferBenefit} value="Nowy"/>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <input type="button" className="btn btn-danger ms-auto" value="Usuń" onClick={deleteNewOffer}/>
                </div>
            </div>)})}

            {offers.map((e, i) => { return (
            <div key={e.offer_id} data-key={e.offer_id} className={`${i > 0 || newOffers.length > 0 ? 'my-5' : 'mb-5'}`}>
                {(i > 0 || newOffers.length > 0) && <hr/>}
                <div className="row">
                    <div className="col-md-6 col-12">
                        <label htmlFor="postion" className="form-label">Stanowisko</label>
                        <input type="text" value={e.position} onChange={handleOfferChange} name="position" className={`form-control ${offersErrors[1] && offersErrors[0][i].position ? 'is-invalid' : ''}`} id="position"/>
                        {offersErrors[1] && <div className="invalid-feedback">{offersErrors[0][i].position}</div>}

                        <label htmlFor="min_wage" className="form-label pt-3">Minimalna stawka</label>
                        <input type="number" value={e.min_wage} onChange={handleOfferChange} name="min_wage" className={`form-control ${offersErrors[1] && offersErrors[0][i].min_wage ? 'is-invalid' : ''}`} id="min_wage"/>
                        {offersErrors[1] && <div className="invalid-feedback">{offersErrors[0][i].min_wage}</div>}

                        <label htmlFor="max_wage" className="form-label pt-3">Maksymalna stawka</label>
                        <input type="number" value={e.max_wage} onChange={handleOfferChange} name="max_wage" className={`form-control ${offersErrors[1] && offersErrors[0][i].max_wage ? 'is-invalid' : ''}`} id="max_wage"/>
                        {offersErrors[1] && <div className="invalid-feedback">{offersErrors[0][i].max_wage}</div>}

                        <label htmlFor="work_days" className="form-label pt-3">Dni robocze</label>
                        <input type="text" value={e.work_days} onChange={handleOfferChange} name="work_days" className={`form-control ${offersErrors[1] && offersErrors[0][i].work_days ? 'is-invalid' : ''}`} id="work_days"/>
                        {offersErrors[1] && <div className="invalid-feedback">{offersErrors[0][i].work_days}</div>}

                        <label htmlFor="work_hours" className="form-label pt-3">Godziny pracy</label>
                        <input type="text" value={e.work_hours} onChange={handleOfferChange} name="work_hours" className={`form-control ${offersErrors[1] && offersErrors[0][i].work_hours ? 'is-invalid' : ''}`} id="work_hours"/>
                        {offersErrors[1] && <div className="invalid-feedback">{offersErrors[0][i].work_hours}</div>}

                        <label htmlFor="expires" className="form-label pt-3">Wygaśnięcie oferty</label>
                        <input type="date" value={e.expires} onChange={handleOfferChange} name="expires" className={`form-control ${offersErrors[1] && offersErrors[0][i].expires ? 'is-invalid' : ''}`} id="expires"/>
                        {offersErrors[1] && <div className="invalid-feedback">{offersErrors[0][i].expires}</div>}

                        <label htmlFor="available_posts" className="form-label pt-3">Dostępne stanowiska</label>
                        <input type="number" value={e.available_posts} onChange={handleOfferChange} name="available_posts" className={`form-control ${offersErrors[1] && offersErrors[0][i].available_posts ? 'is-invalid' : ''}`} id="available_posts"/>
                        {offersErrors[1] && <div className="invalid-feedback">{offersErrors[0][i].available_posts}</div>}
                        
                        <label className="pt-3">Obowiązki</label>
                        <ul style={{maxHeight: 335, overflowY: "auto"}}>
                            {e.responsibilities.map((se, j) => { return (
                                <li key={se.offer_responsibility_id} className="position-relative">
                                    <input data-key={se.offer_responsibility_id} type="text" value={se.offer_responsibility} onChange={handleOfferChange} name="responsibilities" className={`my-3 pe-5 form-control ${offersErrors[1] && offersErrors[0][i].responsibilities[j].offer_responsibility ? 'is-invalid' : ''}`}/>
                                    {offersErrors[1] && <div className="invalid-feedback">{offersErrors[0][i].responsibilities[j].offer_responsibility}</div>}
                                    <input type="button" onClick={deleteResponsibility} className="btn-close position-absolute top-0 end-0 mt-2 me-2"/>
                                </li>
                            )})}
                            {offerNewResponsibilities[offerNewResponsibilities.findIndex(r => r.id == e.offer_id)].responsibilities.map((se, i) => { return (
                                <li key={-i - 1} className="position-relative">
                                    <input data-key={-i - 1} type="text" value={se} onChange={handleOfferNewResponsibilitiesChange} name="responsibilities" className={`my-3 pe-5 form-control ${offerNewResponsibilitiesErrors[1] && offerNewResponsibilitiesErrors[0][offerNewResponsibilitiesErrors.findIndex(r => r.id == e.offer_id)].responsibilities[i] ? 'is-invalid' : ''}`}/>
                                    {offerNewResponsibilitiesErrors[1] && <div className="invalid-feedback">{offerNewResponsibilitiesErrors[0][offerNewResponsibilitiesErrors.findIndex(r => r.id == e.offer_id)].responsibilities[i]}</div>}
                                    <input type="button" onClick={deleteNewResponsibility} className="btn-close position-absolute top-0 end-0 mt-2 me-2"/>
                                </li>
                            )})}
                        </ul>
                        <div className="d-flex justify-content-end">
                            <input type="button" className="btn btn-primary" onClick={addNewResponsibility} value="Nowy"/>
                        </div>

                        <label className="pt-3">Wymagania</label>
                        <ul style={{maxHeight: 335, overflowY: "auto"}}>
                            {e.requirements.map((se, j) => { return (
                                <li key={se.requirement_id} className="position-relative">
                                    <input data-key={se.requirement_id} type="text" value={se.requirement} onChange={handleOfferChange} name="requirements" className={`my-3 pe-5 form-control ${offersErrors[1] && offersErrors[0][i].requirements[j].requirement ? 'is-invalid' : ''}`}/>
                                    {offersErrors[1] && <div className="invalid-feedback">{offersErrors[0][i].requirements[j].requirement}</div>}
                                    <input type="button" onClick={deleteRequirement} className="btn-close position-absolute top-0 end-0 mt-2 me-2"/>
                                </li>
                            )})}
                            {offerNewRequirements[offerNewRequirements.findIndex(r => r.id == e.offer_id)].requirements.map((se, i) => { return (
                                <li key={-i - 1} className="position-relative">
                                    <input data-key={-i - 1} type="text" value={se} onChange={handleOfferNewRequirementsChange} name="requirements" className={`my-3 pe-5 form-control ${offerNewRequirementsErrors[1] && offerNewRequirementsErrors[0][offerNewRequirementsErrors.findIndex(r => r.id == e.offer_id)].requirements[i] ? 'is-invalid' : ''}`}/>
                                    {offerNewRequirementsErrors[1] && <div className="invalid-feedback">{offerNewRequirementsErrors[0][offerNewRequirementsErrors.findIndex(r => r.id == e.offer_id)].requirements[i]}</div>}
                                    <input type="button" onClick={deleteNewRequirement} className="btn-close position-absolute top-0 end-0 mt-2 me-2"/>
                                </li>
                            )})}
                        </ul>
                        <div className="d-flex justify-content-end">
                            <input type="button" className="btn btn-primary" onClick={addNewRequirement} value="Nowy"/>
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <label htmlFor="category_id" className="form-label">Kategoria</label>
                        <select onChange={handleOfferChange} defaultValue={e.category_id} name="category_id" className="form-select" id="category_id">
                            {props.categories.map(se => {return <option key={se.category_id} value={se.category_id}>{se.category}</option>})}
                        </select>

                        <label htmlFor="job_level_id" className="form-label pt-3">Poziom stanowiska</label>
                        <select onChange={handleOfferChange} defaultValue={e.job_level_id} name="job_level_id" className="form-select" id="job_level_id">
                            {props.jobLevels.map(se => {return <option key={se.job_level_id} value={se.job_level_id}>{se.job_level}</option>})}
                        </select>

                        <label htmlFor="type_of_contract_id" className="form-label pt-3">Rodzaj umowy</label>
                        <select onChange={handleOfferChange} defaultValue={e.type_of_contract_id} name="type_of_contract_id" className="form-select" id="type_of_contract_id">
                            {props.typesOfContract.map(se => {return <option key={se.type_of_contract_id} value={se.type_of_contract_id}>{se.type_of_contract}</option>})}
                        </select>

                        <label htmlFor="work_shift_id" className="form-label pt-3">Wymiar pracy</label>
                        <select onChange={handleOfferChange} defaultValue={e.work_shift_id} name="work_shift_id" className="form-select" id="work_shift_id">
                            {props.workShifts.map(se => {return <option key={se.work_shift_id} value={se.work_shift_id}>{se.work_shift}</option>})}
                        </select>

                        <label htmlFor="job_type_id" className="form-label pt-3">Tryb pracy</label>
                        <select onChange={handleOfferChange} defaultValue={e.job_type_id} name="job_type_id" className="form-select" id="job_type_id">
                            {props.jobTypes.map(se => {return <option key={se.job_type_id} value={se.job_type_id}>{se.job_type}</option>})}
                        </select>

                        <label htmlFor="description" className="form-label pt-3">Opis oferty</label>
                        <textarea value={e.description} onChange={handleOfferChange} name="description" style={{minHeight: 123}} className={`form-control ${offersErrors[1] && offersErrors[0][i].description ? 'is-invalid' : ''}`} id="description"/>
                        {offersErrors[1].description && <div className="invalid-feedback">{offersErrors[0].description}</div>}
                    
                        <label className="pt-3">Benefity</label>
                        <ul style={{maxHeight: 335, overflowY: "auto"}}>
                            {e.benefits.map((se, j) => { return (
                                <li key={se.benefit_id} className="position-relative">
                                    <input data-key={se.benefit_id} type="text" value={se.benefit} onChange={handleOfferChange} name="benefits" className={`my-3 pe-5 form-control ${offersErrors[1] && offersErrors[0][i].benefits[j].benefit ? 'is-invalid' : ''}`}/>
                                    {offersErrors[1] && <div className="invalid-feedback">{offersErrors[0][i].benefits[j].benefit}</div>}
                                    <input type="button" onClick={deleteBenefit} className="btn-close position-absolute top-0 end-0 mt-2 me-2"/>
                                </li>
                            )})}
                            {offerNewBenefits[offerNewBenefits.findIndex(b => b.id == e.offer_id)].benefits.map((se, i) => { return (
                                <li key={-i - 1} className="position-relative">
                                    <input data-key={-i - 1} type="text" value={se} onChange={handleOfferNewBenefitsChange} name="benefits" className={`my-3 pe-5 form-control ${offerNewBenefitsErrors[1] && offerNewBenefitsErrors[0][offerNewBenefitsErrors.findIndex(b => b.id == e.offer_id)].benefits[i] ? 'is-invalid' : ''}`}/>
                                    {offerNewBenefitsErrors[1] && <div className="invalid-feedback">{offerNewBenefitsErrors[0][offerNewBenefitsErrors.findIndex(b => b.id == e.offer_id)].benefits[i]}</div>}
                                    <input type="button" onClick={deleteNewBenefit} className="btn-close position-absolute top-0 end-0 mt-2 me-2"/>
                                </li>
                            )})}
                        </ul>
                        <div className="d-flex justify-content-end">
                            <input type="button" className="btn btn-primary" onClick={addNewBenefit} value="Nowy"/>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <input type="button" className="btn btn-danger ms-auto" value="Usuń" onClick={deleteOffer}/>
                </div>
            </div>)})}
            <div className="d-flex justify-content-end mt-3">
                <input type="submit" value="Zapisz" className="btn btn-primary ms-auto"/>
            </div>
        </form>
    )
}