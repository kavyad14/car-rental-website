(function() {
		
		let field = document.querySelector('.items');
		// console.log(field);
		let li = Array.from(field.children);

		function FilterProduct() {
			for(let i of li){
				const name = i.querySelector('strong');
				const x = name.textContent;
				i.setAttribute("data-category", x);
			}

			let indicator = document.querySelector('.indicator').children;

			this.run = function() {
				for(let i=0; i<indicator.length; i++)
				{
					indicator[i].onclick = function () {
						for(let x=0; x<indicator.length; x++)
						{
							indicator[x].classList.remove('active');
						}
						this.classList.add('active');
						const displayItems = this.getAttribute('data-filter');

						for(let z=0; z<li.length; z++)
						{
							li[z].style.transform = "scale(0)";
							setTimeout(()=>{
								li[z].style.display = "none";
							}, 500);

							if ((li[z].getAttribute('data-category') == displayItems) || displayItems == "all")
							 {
							 	li[z].style.transform = "scale(1)";
							 	setTimeout(()=>{
									li[z].style.display = "block";
								}, 500);
							 }
						}
					};
				}
			}
		}

		function SortProduct() {
			let select = document.getElementById('select');
			let ar = [];

			for(let i of li){
				console.log(i);
				const last = i.lastElementChild;
				const x = last.textContent.split(" ");
				// console.log(x);
				var n = x.length;
				const y = x[n-1];
				// console.log(y);
				i.setAttribute("data-price", y);
				ar.push(i);
			}
			// console.log(ar);
			function addevent(){
				select.onchange = sortingValue;
			}

			this.run = ()=>{
				addevent();
			}
						function SortElem(field,li,asc){
				let  dm, sortli;

				dm = asc ? 1 : -1;
				// console.log(dm);
				sortli = li.sort((a, b)=>{
					const ax = a.getAttribute('data-price');
					const bx = b.getAttribute('data-price');
					return ax > bx ? (1*dm) : (-1*dm);
				});
				// console.log(sortli);
				 while (field.firstChild) {field.removeChild(field.firstChild);}
				 field.append(...sortli);	
			}
			function sortingValue(){
			
				if (this.value === 'Default') {
					while (field.firstChild) {field.removeChild(field.firstChild);}
					field.append(...ar);	
				}
				if (this.value === 'LowToHigh') {
					SortElem(field, li, true);
				}

				if (this.value === 'HighToLow') {
					SortElem(field, li, false);
				}
			}
			
		}

		// new FilterProduct().run();
		new SortProduct().run();
	})();