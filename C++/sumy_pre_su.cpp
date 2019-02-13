#include <iostream>
using namespace std;

int main () {
	
	int licz_dni, licz_pyt;
		
	cin>> licz_dni;
	
	int wis_dzien[licz_dni];
	
	for(int i= 0; i< licz_dni; i++)
		cin>> wis_dzien[i];
	
	cin>> licz_pyt;
	
	int dzien_pocz[licz_pyt], dzien_kon[licz_pyt];
	
	for(int i=0; i< licz_pyt; i++) {
		cin>> dzien_pocz[i];
		cin>> dzien_kon[i];
	}
	
//	cout<<"================="<<endl<< licz_dni<<endl;
//	for(int i= 0; i< licz_dni; i++)
//		cout<< wis_dzien[i]<< " ";
//	cout<< endl<< licz_pyt<<endl;
//	for(int i=0; i< licz_pyt; i++) {
//		cout<< dzien_pocz[i]<< " ";
//		cout<< dzien_kon[i];
//		cout<<endl;
//	}
//	cout<<"================="<<endl;
	
	int s[licz_dni];
	for(int k=1; k<= licz_dni; k++)
		s[k] = s[k - 1] + wis_dzien[k - 1];

	for(int i= 0; i< licz_pyt; i++)
		cout<< s[dzien_kon[i]] - s[dzien_pocz[i]-1]<< endl;
	
	system("pause");
	return 0;	
}
