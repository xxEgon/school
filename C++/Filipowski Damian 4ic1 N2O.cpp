#include <iostream>
#include <stack>
using namespace std;

int priorytet (char);

int main () {
	
	//cout<<"Podaj ilosc"<<endl;
	int ilosc = 0;
	cin>> ilosc;
	int il_znakow = 0;

	stack<char> stos;
	string wyr_final = "";
	
	for(int i =0; i< ilosc; i++ ) {
		//cout<<"Podaj wyrazenie nr " << i+1 << endl;
		cin>> il_znakow;
		string wyr = "";
		cin>> wyr;
		
		string wyr_onp = "";
		
		for(int j = 0 ; j< il_znakow ; j++) {
			switch(wyr[j])                                
		    {                      
			case '(' : 
				stos.push('(');            
			    break;
			case ')' : 
				while(stos.top() != '(') {   
			     	wyr_onp+= stos.top();
					stos.pop(); 
				}
				stos.pop();
			    break;
			case '*' : 
			case '/' : 
			case '+' :                          
			case '-' : 
			case '^' : 
				while(stos.size() > 0) 				  
					if(priorytet(stos.top()) >= priorytet(wyr[j])) {
						wyr_onp+= stos.top();
						stos.pop(); 
					}
					else break;					
				stos.push(wyr[j]);
				wyr_onp+= " ";	
				break;
			case ' ' : 
				break;
			default:  
				wyr_onp+= wyr[j];							        
			    break;
		    }
		}
		while(stos.size() > 0) {
			wyr_onp+= stos.top(); 
			stos.pop(); 
		}
		wyr_final+= wyr_onp;
		wyr_final+= '\n';		
	}	
	cout<<endl <<wyr_final<<endl;
	
	system("pause");
	return 0;	
}

int priorytet (char znak) {	 
	switch(znak)
	{
		case '+':
		case '-': return 1;
		case '*':
		case '/': return 2;
		case '^': return 3;
	}
	return 0;
}
