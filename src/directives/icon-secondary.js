export default{
    beforeMount(el, binding) {
        let iconClass = ` text-2xl text-green-400 fa fa-${binding.value.icon}`;

        if(binding.value.right){
            iconClass += ' float-right';
        }

        el.innerHTML += `<i class="${iconClass}"></i>`
    }
};