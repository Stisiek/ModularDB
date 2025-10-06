export function Confirmable(message: string = 'Czy na pewno?') {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const modalService = (this as any).confirmationModalService;
      
      if (!modalService) {
        console.error('ConfirmationModalService nie został wstrzyknięty do komponentu!');
        return;
      }
      
      const confirmed = await modalService.confirm(message);
      
      if (confirmed) {
        return originalMethod.apply(this, args);
      }
    };

    return descriptor;
  };
}