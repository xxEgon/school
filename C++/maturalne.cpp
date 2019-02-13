#include <iostream>
using namespace std;


int main(int argc, char** argv) {
	int il_p, p;
	bool dobra_il = false;
	
	while(!dobra_il) {
		cout<<"Podaj ilosc pierwiastkow: "<<endl;
		cin>>il_p;
		if(il_p >= 50 || il_p <= 1)
			cout<< "Podaj poprawna ilosc (1 < ilosc < 50)"<< endl;
		else
			dobra_il = true;
	}
	
	int t_pierw[il_p];
	cout<<"Podaj pierwiastki oddzielone spacja: "<<endl;
	for(int i=0; i< il_p; i++)	
		cin>>t_pierw[i];
		
	int t_wyn[il_p + 1];
	t_wyn[0]= 1;
	
	for(int i= 1; i <= il_p; i++)
		t_wyn[i]=0;
			
	for(int i= 0; i < il_p ; i++)
		for(int j= il_p; j >= 0 ; j--)
			t_wyn[j]= t_wyn[j] - (t_pierw[i]* t_wyn[j-1]);
	
	cout<<"Odpowiedz: "<<endl;
	for(int i=0; i< il_p+ 1; i++)
		cout<<t_wyn[i]<<" ";
				
	system("pause");
	return 0;
}
