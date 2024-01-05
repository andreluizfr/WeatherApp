export default function filterCityListByInput(cityList: string[], inputValue: string) {
    return cityList.filter(cityItem=>{
        let notFiltering = false;

        const processedCityItem = cityItem
            .replace(', ', ' ')
            .toLowerCase();

        const arrInputValue = inputValue
            .replace(/[\s,.;]+/g, ' ') //trocar sequencias de espaço em branco, vírgulas, ponto e ponto e vírgula por um único espaço
            .trim() //remover espaços em branco no começo ou no final
            .toLowerCase()
            .split(' ');

        arrInputValue.forEach(inputItem=>{
            if(inputItem.length > 2 && processedCityItem.includes(inputItem)){
                notFiltering = true;
            }
        });

        return notFiltering;
    });
}